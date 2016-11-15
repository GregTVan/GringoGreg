import com.google.gson.*;
import java.io.*;

public class PhraseGetter {
	
	public static Phrases get() {
		Phrases phrases = null;
		try {
			BufferedReader br = new BufferedReader(new FileReader("/tmp/phrases.json"));
			Gson gson = new GsonBuilder().create();
			phrases = gson.fromJson(br,  Phrases.class);
			return phrases;
//			System.out.println("Hola Mundo! " + phrases.source);
//			phrases.phrases.forEach(item -> System.out.println(item.esRaw));
		} catch (Exception e) {
		}
		return null;
	}
	
}