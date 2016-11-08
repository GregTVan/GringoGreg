import com.google.gson.*;
import java.io.*;

public class PhraseGetter {
	public static void main(String[] args) {
		try {
			BufferedReader br = new BufferedReader(new FileReader("phrases.json"));
			Gson gson = new GsonBuilder().create();
			Phrases phrases = gson.fromJson(br,  Phrases.class);
			System.out.println("Hola Mundo! " + phrases.source);
			phrases.phrases.forEach(item -> System.out.println(item.esRaw));
		} catch (Exception e) {
		}
	}
}