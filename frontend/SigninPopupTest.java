import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SigninPopupTest {
	
	static String myUserName = "kewennnnn";
	static String myPassword = "Password!!!";

	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/");

		// click signin button on navbar to trigger signinpopup
		driver.findElement(By.id("signin-button")).click();
		System.out.println("signin-button clicked!");
		Thread.sleep(1000);
		// activatePopup();

		// fill in credentials field
		driver.findElement(By.id("signin-creds")).sendKeys(myUserName);
		Thread.sleep(1000);

		// fill in password field
		driver.findElement(By.id("signin-password")).sendKeys(myPassword);
		Thread.sleep(1000);

		// click signin button on popup to submit
		driver.findElement(By.id("signin-popup-button")).click();
		System.out.println("signin-popup-button clicked!");
		Thread.sleep(1000);

		// dismiss alert for successful signin
		driver.switchTo().alert().accept();
		System.out.println("alert dismissed!");
		Thread.sleep(1000);

		// check if navbar updates to logged in version 
		if (driver.findElements(By.id("profile-button")).isEmpty() || driver.findElements(By.id("create-post-button")).isEmpty()) {
			System.out.println("logged in navbar failed to generate!"); 
		} else {
			System.out.println("logged in navbar is displayed successfully!"); 
		}
		Thread.sleep(1000);

		// click logout button on navbar 
		driver.findElement(By.id("profile-button")).click();
		Thread.sleep(1000);
		driver.findElement(By.id("profile-dropdown-logout")).click();			
		System.out.println("logged out!");
		Thread.sleep(1000);

		// dismiss alert for successful logout
		driver.switchTo().alert().accept();
		System.out.println("alert dismissed!");
		Thread.sleep(1000);

		// check if navbar updates to logged out version 
		if (driver.findElements(By.id("signup-button")).isEmpty() || driver.findElements(By.id("signin-button")).isEmpty()) {
			System.out.println("logged out navbar failed to generate!"); 
		} else {
			System.out.println("logged out navbar is displayed successfully!"); 
		}
		Thread.sleep(1000);

		// click signin button on navbar to trigger signinpopup
		driver.findElement(By.id("signin-button")).click();
		System.out.println("signin-button clicked!");
		Thread.sleep(1000);

		// fill and delete credentials field 
		driver.findElement(By.id("signin-creds")).sendKeys("a");
		Thread.sleep(1000);
		driver.findElement(By.id("signin-creds")).sendKeys(Keys.BACK_SPACE);
		Thread.sleep(1000);
		if (driver.findElements(By.className("inputWarning")).size() !=1 ) {
			System.out.println("warning for empty credentials field failed to generate!"); 
		} else {
			System.out.println("warning for empty credentials field is displayed successfully!"); 
		}
		Thread.sleep(1000);
		driver.findElement(By.id("signin-creds")).sendKeys("87654321");
		if (driver.findElements(By.className("inputWarning")).isEmpty() ) {
			System.out.println("warning for empty credentials field updated sucessfully!"); 
		} else {
			System.out.println("warning for empty credentials field failed to disappear!"); 
		}
		Thread.sleep(1000);

		// fill and delete password field, attempt to submit when empty
		driver.findElement(By.id("signin-password")).sendKeys("a");
		Thread.sleep(1000);
		driver.findElement(By.id("signin-password")).sendKeys(Keys.BACK_SPACE);
		Thread.sleep(1000);
		if (driver.findElements(By.className("inputWarning")).size() !=1 ) {
			System.out.println("warning for empty password field failed to generate!"); 
		} else {
			System.out.println("warning for empty password field is displayed successfully!"); 
		}
		Thread.sleep(1000);
		driver.findElement(By.id("signin-popup-button")).click();
		System.out.println("signin-popup-button clicked!");
		if (driver.findElements(By.className("formWarning")).size() !=1 ) {
			System.out.println("warning for empty field upon submit failed to generate!"); 
		} else {
			System.out.println("warning for empty field upon submit is displayed successfully!"); 
		}
		Thread.sleep(1000);
		driver.findElement(By.id("signin-password")).sendKeys("Password1");
		if (driver.findElements(By.className("inputWarning")).isEmpty() ) {
			System.out.println("warning for empty credentials field updated sucessfully!"); 
		} else {
			System.out.println("warning for empty credentials field failed to disappear!"); 
		}
		Thread.sleep(1000);

		// click cross button to exit popup 
		driver.findElement(By.id("popup-cross-icon")).click();
		if (driver.findElements(By.id("signin-popup")).isEmpty() && driver.findElements(By.id("signinpopup-background")).isEmpty()) {
			System.out.println("signin popup closed successfully!"); 
		} else {
			System.out.println("signin popup failed to close!"); 
		}
		System.out.println("Testing of SigninPopup complete!"); 
	}
}
