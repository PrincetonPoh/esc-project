import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CreatePostTest {
	
	static String myUserName = "kewendev";
	static String myPassword = "passw0rd";
	static int sleepDuration = 100;
	static String[] textInputFieldIDs = {"input-posttitle","input-location","input-description","input-datetimedetails"};
	static String[][] legalInputs = {
		{"Some offer","321 Clementi","Random description","01.02.2021","CLEMENTI","0","3"},
		{"An event","Bedok Mall","Random description","12.05.2022","BEDOK","1","3"},
		{"Badminton","CCK Community Centre","Random description","03.09.2020","CHOA CHU KANG","1","2"}, 
		{"Walk your dog","Around SUTD","Random description","07.03.2020","TAMPINES","0","2"}
	};

	public static void main(String[] args) throws InterruptedException {	

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/");
		// driver.get("http://scratchtest.ddns.net/");

		signIn(driver);

		for (int i=0; i<10; i++) {
			createRandomPost(driver);
		}

		for (String[] legalInputSet : legalInputs) {
			createPost(legalInputSet, driver);
		}

		for (int i=0; i<3; i++) {
			createRandomEmptyFieldPost(driver);
		}

		for (int i=0; i<3; i++) {
			createRandomIllegalDatePost(driver);
		}

		System.out.println("Testing of CreatePost complete!"); 
	}

	static void createPost(String[] inputs, WebDriver driver) throws InterruptedException {
		System.out.println("==========================\nFilling in preset inputs");

		// go to create post page 
		driver.findElement(By.id("create-post-button")).click();
		Thread.sleep(sleepDuration);

		// fill in fields 
		for (int i=0; i < textInputFieldIDs.length; i++) {
			driver.findElement(By.id(textInputFieldIDs[i])).sendKeys(inputs[i]);
			Thread.sleep(sleepDuration);
		}
		Select regionDropdown = new Select(driver.findElement(By.id("input-region")));
		regionDropdown.selectByVisibleText(inputs[4]);
		driver.findElements(By.className("form-radio")).get(Integer.parseInt(inputs[5])).click();
		Thread.sleep(sleepDuration);
		
		// click create post 
		driver.findElement(By.id("create-post-form-button")).click();
		dismissAlert(driver);
		
	}

	static void createRandomPost(WebDriver driver) throws InterruptedException {
		System.out.println("==========================\nFilling in random inputs");

		// go to create post page 
		driver.findElement(By.id("create-post-button")).click();
		Thread.sleep(sleepDuration);

		// fill in text fields 
		for (int i=0; i < textInputFieldIDs.length-1; i++) {
			driver.findElement(By.id(textInputFieldIDs[i])).sendKeys(randomText());
			Thread.sleep(sleepDuration);
		}

		// fill in date field
		driver.findElement(By.id(textInputFieldIDs[3])).sendKeys(randomDate());
		Thread.sleep(sleepDuration);

		// select from dropdown
		Random random = new Random(); 
		Select regionDropdown = new Select(driver.findElement(By.id("input-region")));
		regionDropdown.selectByIndex(random.nextInt(54));

		// select radio elements 
		java.util.List<WebElement> radioElements = driver.findElements(By.className("form-radio"));
		radioElements.get(random.nextInt(2)).click();
		radioElements.get(random.nextInt(2)+2).click();
		Thread.sleep(sleepDuration);
		
		// click create post 
		driver.findElement(By.id("create-post-form-button")).click();
		dismissAlert(driver);
	}

	static void createRandomEmptyFieldPost(WebDriver driver) throws InterruptedException {
		System.out.println("==========================\nFilling in random inputs but with a random empty field");

		// go to create post page 
		driver.findElement(By.id("create-post-button")).click();
		Thread.sleep(sleepDuration);

		// choose random field to leave empty 
		Random random = new Random();
		int emptyFieldIndex = random.nextInt(textInputFieldIDs.length); 

		// fill in text fields 
		for (int i=0; i < textInputFieldIDs.length-1; i++) {
			if (i != emptyFieldIndex) {
				driver.findElement(By.id(textInputFieldIDs[i])).sendKeys(randomText());
				Thread.sleep(sleepDuration);
			}
		}

		// fill in date field
		if (emptyFieldIndex != 3) {
			driver.findElement(By.id(textInputFieldIDs[3])).sendKeys(randomDate());
			Thread.sleep(sleepDuration);
		}

		// select from dropdown
		Select regionDropdown = new Select(driver.findElement(By.id("input-region")));
		regionDropdown.selectByIndex(random.nextInt(54));

		// select radio elements 
		java.util.List<WebElement> radioElements = driver.findElements(By.className("form-radio"));
		radioElements.get(random.nextInt(2)).click();
		radioElements.get(random.nextInt(2)+2).click();
		Thread.sleep(sleepDuration);
		
		// click create post 
		driver.findElement(By.id("create-post-form-button")).click();
		dismissAlert(driver);
		driver.navigate().back();
	}

	static void createRandomIllegalDatePost(WebDriver driver) throws InterruptedException {
		System.out.println("==========================\nFilling in random inputs");

		// go to create post page 
		driver.findElement(By.id("create-post-button")).click();
		Thread.sleep(sleepDuration);

		// fill in text fields and date field
		for (int i=0; i < textInputFieldIDs.length; i++) {
			driver.findElement(By.id(textInputFieldIDs[i])).sendKeys(randomText());
			Thread.sleep(sleepDuration);
		}

		// select from dropdown
		Random random = new Random(); 
		Select regionDropdown = new Select(driver.findElement(By.id("input-region")));
		regionDropdown.selectByIndex(random.nextInt(54));

		// select radio elements 
		java.util.List<WebElement> radioElements = driver.findElements(By.className("form-radio"));
		radioElements.get(random.nextInt(2)).click();
		radioElements.get(random.nextInt(2)+2).click();
		Thread.sleep(sleepDuration);
		
		// click create post 
		driver.findElement(By.id("create-post-form-button")).click();
		dismissAlert(driver);
		driver.navigate().back();
	}

	static void signIn(WebDriver driver) throws InterruptedException {
		// click signin button on navbar to trigger signinpopup
		driver.findElement(By.id("signin-button")).click();
		Thread.sleep(sleepDuration);

		// fill in credentials field
		driver.findElement(By.id("signin-creds")).sendKeys(myUserName);
		Thread.sleep(sleepDuration);

		// fill in password field
		driver.findElement(By.id("signin-password")).sendKeys(myPassword);
		Thread.sleep(sleepDuration);

		// click signin button on popup to submit
		driver.findElement(By.id("popup-button")).click();
		Thread.sleep(sleepDuration);

		// dismiss alert for successful signin
		dismissAlert(driver);
		System.out.println("signed in successfully!");
	}

	static void dismissAlert(WebDriver driver) {
		WebDriverWait wait = new WebDriverWait(driver, 15);
		wait.until(ExpectedConditions.alertIsPresent());
		System.out.println("Alert message: "+driver.switchTo().alert().getText());
		driver.switchTo().alert().accept();
	}

	static String randomText() {
		String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+=-~`:;\"/\\[]{}<>,.|";
        Random random = new Random();
		int len = random.nextInt(10);
		len += 5;
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(random.nextInt(chars.length())));
        return sb.toString();
	}

	static String randomDate() {
		Random random = new Random();
		String ans = ""; 
		ans += String.valueOf(random.nextInt(4)); 
		ans += String.valueOf(random.nextInt(10)); 
		ans += ".";
		ans += String.valueOf(random.nextInt(1)); 
		ans += String.valueOf(random.nextInt(10)); 
		ans += ".";
		ans += String.valueOf(random.nextInt(10)); 
		ans += String.valueOf(random.nextInt(10)); 
		ans += String.valueOf(random.nextInt(10)); 
		ans += String.valueOf(random.nextInt(10)); 
		return ans; 
	}
}
