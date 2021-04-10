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
	
	static String myUserName = "kewendev";
	static String myPassword = "passw0rd";
	static int sleepDuration = 1000;

	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/");
		// driver.get("http://scratchtest.ddns.net/");

		// click signin button on navbar to trigger signinpopup
		driver.findElement(By.id("signin-button")).click();
		System.out.println("signin-button clicked!");
		Thread.sleep(sleepDuration);
		// activatePopup();

		// fill in credentials field
		driver.findElement(By.id("signin-creds")).sendKeys(myUserName);
		Thread.sleep(sleepDuration);

		// fill in password field
		driver.findElement(By.id("signin-password")).sendKeys(myPassword);
		Thread.sleep(sleepDuration);

		// click signin button on popup to submit
		driver.findElement(By.id("popup-button")).click();
		System.out.println("popup-button clicked!");
		Thread.sleep(sleepDuration);

		// dismiss alert for successful signin
		WebDriverWait wait = new WebDriverWait(driver, 15);
		wait.until(ExpectedConditions.alertIsPresent());
		driver.switchTo().alert().accept();
		System.out.println("alert dismissed!");
		Thread.sleep(sleepDuration);

		// check if navbar updates to logged in version 
		if (driver.findElements(By.id("profile-button")).isEmpty() || driver.findElements(By.id("create-post-button")).isEmpty()) {
			System.out.println("logged in navbar failed to generate!"); 
		} else {
			System.out.println("logged in navbar is displayed successfully!"); 
		}
		Thread.sleep(sleepDuration);

		// check if username is displayed 
		driver.findElement(By.id("profile-button")).click();
		Thread.sleep(sleepDuration);
		String displayedUsername = driver.findElement(By.id("profile-dropdown-username")).getText();
		if (displayedUsername == myUserName) {
			System.out.println("username is displayed successfully!"); 
		} else {
			System.out.println("username failed to be displayed!"); 
		}

		// click logout button on navbar 
		driver.findElement(By.id("profile-dropdown-logout")).click();			
		System.out.println("logged out!");
		Thread.sleep(sleepDuration);

		// dismiss alert for successful logout
		driver.switchTo().alert().accept();
		System.out.println("alert dismissed!");
		Thread.sleep(sleepDuration);

		// check if navbar updates to logged out version 
		if (driver.findElements(By.id("signup-button")).isEmpty() || driver.findElements(By.id("signin-button")).isEmpty()) {
			System.out.println("logged out navbar failed to generate!"); 
		} else {
			System.out.println("logged out navbar is displayed successfully!"); 
		}
		Thread.sleep(sleepDuration);

		// click signin button on navbar to trigger signinpopup
		driver.findElement(By.id("signin-button")).click();
		System.out.println("signin-button clicked!");
		Thread.sleep(sleepDuration);

		// fill and delete credentials field 
		driver.findElement(By.id("signin-creds")).sendKeys("a");
		Thread.sleep(sleepDuration);
		driver.findElement(By.id("signin-creds")).sendKeys(Keys.BACK_SPACE);
		Thread.sleep(sleepDuration);
		if (driver.findElements(By.className("inputWarning")).size() !=1 ) {
			System.out.println("warning for empty credentials field failed to generate!"); 
		} else {
			System.out.println("warning for empty credentials field is displayed successfully!"); 
		}
		Thread.sleep(sleepDuration);
		driver.findElement(By.id("signin-creds")).sendKeys("87654321");
		if (driver.findElements(By.className("inputWarning")).isEmpty() ) {
			System.out.println("warning for empty credentials field updated sucessfully!"); 
		} else {
			System.out.println("warning for empty credentials field failed to disappear!"); 
		}
		Thread.sleep(sleepDuration);

		// fill and delete password field, attempt to submit when empty
		driver.findElement(By.id("signin-password")).sendKeys("a");
		Thread.sleep(sleepDuration);
		driver.findElement(By.id("signin-password")).sendKeys(Keys.BACK_SPACE);
		Thread.sleep(sleepDuration);
		if (driver.findElements(By.className("inputWarning")).size() !=1 ) {
			System.out.println("warning for empty password field failed to generate!"); 
		} else {
			System.out.println("warning for empty password field is displayed successfully!"); 
		}
		Thread.sleep(sleepDuration);
		driver.findElement(By.id("popup-button")).click();
		System.out.println("popup-button clicked!");
		if (driver.findElements(By.className("formWarning")).size() !=1 ) {
			System.out.println("warning for empty field upon submit failed to generate!"); 
		} else {
			System.out.println("warning for empty field upon submit is displayed successfully!"); 
		}
		Thread.sleep(sleepDuration);
		driver.findElement(By.id("signin-password")).sendKeys("Password1");
		if (driver.findElements(By.className("inputWarning")).isEmpty() ) {
			System.out.println("warning for empty credentials field updated sucessfully!"); 
		} else {
			System.out.println("warning for empty credentials field failed to disappear!"); 
		}
		Thread.sleep(sleepDuration);

		// check if backend detect non-existent user 
		driver.findElement(By.id("popup-button")).click();
		System.out.println("popup-button clicked!");
		if (driver.findElements(By.className("formWarning")).size() !=1 ) {
			System.out.println("warning for inexistent user failed to generate!"); 
		} else {
			System.out.println("warning for inexistent user is displayed successfully!"); 
		}

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
