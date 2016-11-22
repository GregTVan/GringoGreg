import com.google.gson.*;
import java.io.*;
//import java.sql.*;
//import java.text.*;
//import java.util.*;
//import java.util.regex.*;
import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.*;

@WebServlet("/GringoGreg")
//@MultipartConfig
public class GringoGreg extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException {
//        request.setCharacterEncoding("UTF-8");
//        String searchTerm = request.getParameter("search_term");
//        String matchResult = request.getParameter("match_result");
//        String language = request.getParameter("language");
//        if(language == null) {
//            language = "en";
//        }
//        language = language.toLowerCase();
//        if(!(language.equals("en")) && !(language.equals("fr"))) {
//            language = "en";
//        }
//        String user = request.getParameter("user");
    	PrintWriter out = response.getWriter();
    	response.setContentType("application/json;charset=UTF-8");
    	Phrases phrases = PhraseGetter.get();
    	Gson gson = new GsonBuilder().create();
    	String json = gson.toJson(phrases);
    	out.print(json);
    	return;
//        SQLExecutor sqlExecutor = new SQLExecutor();
//        if(searchTerm.equals("ACTIVITY_ONLY")) {
//            String activity = ActivityGetter.getActivity(user, language);
//            System.out.println(activity);
//            out.print(activity);
//            return;
//        }
//        searchTerm = searchTerm.toLowerCase();
//        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//        try {
//			QueryResult qr = Searcher.search(searchTerm, false, user, language);
//			String json = gson.toJson(qr);
//            System.out.println("before trim=" + json.length());
//            // filter out &nbsp's
//            // this is important to make PDF work; &nbsp renders fine in HTML but looks like an accented "A" in PDF
//            json = json.replace((char)160, (char)(32));
//            System.out.println("after trim=" + json.length());
//            System.out.println("SEARCH: " + json);
//            out.print(json);
//        } catch (Exception e) {
//            System.out.println("error gson: " + e + " " + e.getMessage());
//            e.printStackTrace();
//        }
    }
    
//    public void doPost(HttpServletRequest request, HttpServletResponse response)
//        throws IOException, ServletException {
//        // TODO handle nicely if any of these are undefined (not supplied by client), currently we NPE
//        // OMG this is important to print french stuff correctly!
//        request.setCharacterEncoding("UTF-8");
//        String action = request.getParameter("action");
//        String user = request.getParameter("user");
//        String language = request.getParameter("language");
//        if(language == null) {
//            language = "en";
//        }
//        language = language.toLowerCase();
//        if(!(language.equals("en")) && !(language.equals("fr"))) {
//            language = "en";
//        }
//        // add guard here in case action is null
//        if(action.equals("print")) {
//            Printer.print(request.getParameter("match_result"), request.getParameter("search_term"), request.getParameter("user"), response, language);
//        }
//        if(action.equals("search")) {
//            String fileType = request.getParameter("file_type");
//            ArrayList<String> reply;
//            String csv = getAttachment(request);
//            //System.out.println(csv);
//            PrintWriter out = response.getWriter();
//            response.setContentType("application/json;charset=UTF-8");
//            SQLExecutor sqlExecutor = new SQLExecutor();
//            csv = csv.toLowerCase();
//            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
//            try {
//                QueryResult qr = Searcher.search(csv, true, user, language);
//                gson.toJson(qr, out);
//            } catch (Exception e) {
//                System.out.println("error gson: " + e + " " + e.getMessage());
//                e.printStackTrace();
//            }
//        }
//        if(action.equals("upload")) {
//            PrintWriter out = response.getWriter();
//            String fileType = request.getParameter("file_type");
//            ArrayList<String> reply;
//            String csv = getAttachment(request);
//            csv = removeBareLineFeeds(csv);
//            reply = Loader.load(csv, fileType, user, false /*comma delimited*/, false /* month-day-year */);
//            response.setContentType("application/json");
//            // can we use GSON here?
//            out.print("[");
//            for(int j=0; j<reply.size(); j++) {
//                out.print("{\"" + "message" + "\": \"" + reply.get(j) + "\"}");
//                if(j<reply.size() - 1) {
//                    out.print(",");
//                }
//            }
//            out.print("]");
//        }
//    }
//
//    // Filter out any LF's in the Excel. These appear (in hex) as 0a with no preceding 0d.
//    // 0d 0a is a normal line terminator which we do NOT want to filter out. Note this will 
//    // not work if the bare 0a is the very first character in the file, for that we need
//    // a lookbehind, or something a little too tricky for my RE skills.
//    
//    private String removeBareLineFeeds(String str) {
//        countMatches(str);
//        //System.out.println("BEFore BLF's? " + str.matches("([^\\x0d]\\x0a)"));
//        String ret = str.replaceAll("(([^\\x0d])\\x0a)+", "$2");
//        /*System.out.println("BEF...");
//        System.out.println(str);
//        System.out.println("AFT...");
//        System.out.println(ret);
//        System.out.println("AFT has BLF's? " + ret.matches("([^\\x0d]\\x0a)"));*/
//        return ret;
//    }
//    
//    private void countMatches(String str) {
//        // http://stackoverflow.com/questions/7378451/java-regex-match-count
//        Pattern pattern = Pattern.compile("([^\\x0d]\\x0a)");
//        Matcher matcher = pattern.matcher(str);
//        int count = 0;
//        while (matcher.find()) {
//            count++;
//        }
//        // add time etc., also log events more generally
//        System.out.println("Bare line feeds stripped: " + count);
//    }
//    
//    private String getAttachment(HttpServletRequest request)
//        throws IOException, ServletException {
//        Part filePart = request.getPart("file"); // Retrieves <input type="file" name="file">
//        String fileName = getSubmittedFileName(filePart);
//        InputStream fileContent = filePart.getInputStream();
//        StringBuilder stringBuilder = new StringBuilder();
//        int i;
//        while((i = fileContent.read()) != -1) {
//            char c = (char)i;
//            stringBuilder.append(c);
//        }
//        return stringBuilder.toString();
//    }
//
//    // required when Servlet is < 3.1 / Tomcat8 (we use Tomcat7)
//    private static String getSubmittedFileName(Part part) {
//        for (String cd : part.getHeader("content-disposition").split(";")) {
//            if (cd.trim().startsWith("filename")) {
//                String fileName = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
//                return fileName.substring(fileName.lastIndexOf('/') + 1).substring(fileName.lastIndexOf('\\') + 1); // MSIE fix.
//            }
//        }
//        return null;
//    }
    
}
