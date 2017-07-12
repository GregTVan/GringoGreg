import java.io.File;
import java.util.LinkedHashSet;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;
import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoCredential;

import java.util.Arrays;

public class Test {
	
	static String fileName = "31.pdf";
	
	public static void main(String[] args) {
		try {
	        File file = new File("C://temp/" + fileName);
			PDDocument pdDocument = PDDocument.load(file);
			PDFTextStripper pdfTextStripper = new PDFTextStripper();
			String content = pdfTextStripper.getText(pdDocument);
			String[] lines = content.split("\n");
			//System.out.println(content);
			boolean inAnswers = false;
			boolean inExercises = false;
			int questionNumber = 0;
			LinkedHashSet<String> answers = new LinkedHashSet<String>();
			LinkedHashSet<String> questions = new LinkedHashSet<String>();
			for(int i=0;i<lines.length;i++) {
				String line = lines[i].trim();
		        if(line.toLowerCase().equals("ejercicios:")) {
		            inExercises = true;
		            continue;
		        }
		        if(line.toLowerCase().equals("respuestas")) {
		            inExercises = false;
		            inAnswers= true;
		            questionNumber = 0;
		            continue;
		        }
		        if(inExercises) {
		        	if(line.length() < 3) continue;
		        	String question = line.substring(line.indexOf(".") + 1).trim();
		        	int potentialNumber = getLeadingInteger(line);
		        	if(potentialNumber == questionNumber + 1) {
		        		questionNumber++;
	            		questions.add(question);
	            	}
		        }
		        if(inAnswers) {
		        	if(line.length() < 3) continue;
		        	String answer = line.substring(line.indexOf(".") + 1).trim();
		        	int potentialNumber = getLeadingInteger(line);
		        	if(potentialNumber == questionNumber + 1) {
		        		questionNumber++;
	            		answers.add(answer);
	            	}
		        }
			}
			if(questions.size() != answers.size()) {
				System.out.println("ERROR, found " + questions.size() + " questions and " + answers.size() + " answers");
			} else {
				// TODO use for-each
				Object[] questionsArray = questions.toArray();
				Object[] answersArray = answers.toArray();

				MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://GregTomkins:samft99@ds159978.mlab.com:59978/gringogreg"));
				MongoDatabase database = mongoClient.getDatabase("gringogreg");
				MongoCollection<Document> coll = database.getCollection("phrases");
				coll.deleteMany(new Document());
				
				for(int i=0;i<questionsArray.length;i++) {
					//System.out.println(i + 1 + ". " + (String) questionsArray[i] + " => " + (String) answersArray[i]);
					Document doc = new Document();
					doc.append("en", (String) questionsArray[i]);
					doc.append("es", (String) answersArray[i]);
					doc.append("source", fileName);
					coll.insertOne(doc);
				}
				System.out.println("-- COMPLETE --");
			}
		} catch(Exception e) {
			System.out.println("Outer Ex: " + e + e.getMessage());
		}
	}
	
	/*public static HttpEntity getFile(File file) {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
            HttpGet httpGet = new HttpGet ("https://www.sedi.ca/sedi/SVTWeeklySummaryACL?name=W1ALLPDFI&locale=en_CA");
            // you need this header otherwise they just return a regular HTML page
            httpGet.addHeader("Referer", "https://www.sedi.ca/sedi/SVTReportsAccessController?menukey=15.03.00&locale=en_CA");
        	try {
        		//httpGet.setEntity(new UrlEncodedFormEntity(nvps));
        	} catch(Exception e) {
        		throw new RuntimeException(e);
        	}
        	
            HttpResponse response = httpclient.execute(httpGet); //, responseHandler);
            HttpEntity entity = response.getEntity();
            if(entity != null) {
    			InputStream is = entity.getContent();
    			FileOutputStream fos = new FileOutputStream(file); 
				int inByte;
				while((inByte = is.read()) != -1) {
					fos.write(inByte);
				}
				fos.close();
            	return entity;
            }
        	return null;
        } catch(Exception e) {
        	throw new RuntimeException(e);
        } finally {
        	try {
        		httpclient.close();
        	} catch(Exception e) {
        		
        	}
        }
	}
	
	// actually get AND SAVE
	private static void getInsiderDetails(String name) {
		name = name.substring(9);
		boolean success = getIndividualDetails(name);
		if(!success) {
			success = getEntityDetails(name);
		}
		if(!success) {
			MiscUtilities.log("cant find insider info for: " + name);
		}
	}
	
	private static boolean getIndividualDetails(String name) {
		String[] names = name.split(",");
		// legit case, if entity
		if(names.length != 2) {
			return false;
		}
		String html = new SediFileGetter().getFileIndividual(names[0].trim(), names[1].trim());
		// name could have commas BUT STILL not be individual, so trap no result here
		ArrayList<SediFileParseInsider> alSediFileParseInsider = SediFileParser.parseHtml(html, "weekly");
		// we didnt find anything
		if(alSediFileParseInsider.size() == 0) {
			return false;
		}
		for(int i=0;i<alSediFileParseInsider.size();i++) {
			InsiderIndividualDAO.delete(alSediFileParseInsider.get(i).sediId);
			// mapper?
			SediFileParseInsider sediFileParseInsider = alSediFileParseInsider.get(i);
			InsiderIndividualDTO insiderIndividualDTO = new InsiderIndividualDTO();
			insiderIndividualDTO.firstName = names[1].trim();
			insiderIndividualDTO.issuerNameEn = sediFileParseInsider.alIssuerNameEn;
			insiderIndividualDTO.issuerNameFr = sediFileParseInsider.alIssuerNameFr;
			insiderIndividualDTO.lastName = names[0].trim();
			insiderIndividualDTO.municipality = sediFileParseInsider.municipality.trim();
			insiderIndividualDTO.sediId = sediFileParseInsider.sediId.trim();
			// mapper?
			InsiderIndividualDAO.persist(insiderIndividualDTO);
		}
		return true;
	}

	private static boolean getEntityDetails(String name) {
		String html = new SediFileGetter().getFileEntity(name);
		ArrayList<SediFileParseInsider> alSediFileParseInsider = SediFileParser.parseHtml(html, "weekly");
		for(int i=0;i<alSediFileParseInsider.size();i++) {
			InsiderEntityDAO.delete(alSediFileParseInsider.get(i).sediId);
			// mapper?
			SediFileParseInsider sediFileParseInsider = alSediFileParseInsider.get(i);
			InsiderEntityDTO insiderEntityDTO = new InsiderEntityDTO();
			insiderEntityDTO.issuerNameEn = sediFileParseInsider.alIssuerNameEn;
			insiderEntityDTO.issuerNameFr = sediFileParseInsider.alIssuerNameFr;
			insiderEntityDTO.municipality = sediFileParseInsider.municipality.trim();
			insiderEntityDTO.name = sediFileParseInsider.name.trim();
			insiderEntityDTO.sediId = sediFileParseInsider.sediId.trim();
			InsiderEntityDAO.persist(insiderEntityDTO);
		}
		return true;
	}*/
	
	private static int getLeadingInteger(String s) {
		s = s.trim();
		String ret = "";
		for(int i=0;i<s.length();i++) {
			char c = s.substring(i, i+1).toCharArray()[0];
			if(Character.isDigit(c)) {
				ret += c;
			} else {
				break;
			}
		}
		if(ret.equals("")) {
			ret = "0";
		}
		return Integer.parseInt(ret);
	}

}