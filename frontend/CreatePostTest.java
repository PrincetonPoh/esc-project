import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By.ByClassName;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CreatePostTest {
	
	static String myUserName = "kewendev";
	static String myPassword = "passw0rd";
	static int sleepDuration = 100;

	public static void main(String[] args) throws InterruptedException {	
		
		// String[] legalInputs1 = {"Some offer","321 Clementi","Random description","01.02.2021","CLEMENTI","0","3"};
		// String[] legalInputs2 = {"An event","Bedok Mall","Random description","12.05.2022","BEDOK","1","3"};
		String[] legalInputs3 = {"Badminton","CCK Community Centre","Random description","03.09.2020","CHOA CHU KANG","1","2"};
		String[] legalInputs4 = {"Walk your dog","Around SUTD","Random description","07.03.2020","TAMPINES","0","2"};

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/");
		// driver.get("http://scratchtest.ddns.net/");
		Thread.sleep(5000);

		signIn(driver);
		// createPost(legalInputs1, driver);
		// createPost(legalInputs2, driver);
		createPost(legalInputs3, driver);
		createPost(legalInputs4, driver);

		System.out.println("Testing of CreatePost complete!"); 
	}

	static void createPost(String[] inputs, WebDriver driver) throws InterruptedException {

		String[] textInputFieldIDs = {"input-posttitle","input-location","input-description","input-datetimedetails"};

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

		Thread.sleep(5000); // time for us to manually click the recaptcha lmao
		driver.findElement(By.id("create-post-form-button")).click();
		
		WebDriverWait wait = new WebDriverWait(driver, 15);
		wait.until(ExpectedConditions.alertIsPresent());
		// if (driver.switchTo().alert().getText() == "Successful Posted Event") {
		// 	System.out.println("Posted successfully!");
		// } else {
		// 	System.out.println("Create post unsuccessfull!");
		// 	return;
		// }
		driver.switchTo().alert().accept();

		// if (driver.findElement(By.id("user-posts-container")).getText() == "Your Posts") {
		// 	System.out.println("Navigated to posts page successfully!");
		// } else {
		// 	System.out.println("Could not navigate to posts page!");
		// 	return;
		// }

		// List<WebElement> postTitles = driver.findElements(By.className("customCardTitle"));
		// boolean postFound = false;
		// for ( WebElement postTitle : postTitles) {
		// 	if (postTitle.getText() == inputs[0]) {
		// 		postTitle.click();
		// 		postFound = true;
				
		// 		break;
		// 	}
		// }
		// if (postFound) {
		// 	System.out.println("New post found!"); 
		// } else {
		// 	System.out.println("Could not find new post!"); 
		// }
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
		WebDriverWait wait = new WebDriverWait(driver, 15);
		wait.until(ExpectedConditions.alertIsPresent());
		driver.switchTo().alert().accept();
		Thread.sleep(sleepDuration);
		System.out.println("signed in successfully!");
	}
}
