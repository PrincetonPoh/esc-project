import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SigninPopupTest {
	
	static String myUserName = "kewendev";
	static String myPassword = "passw0rd";
	static int sleepDuration = 100;

	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/");
		// driver.get("http://scratchtest.ddns.net/");

		openPopup(driver);
		System.out.println("==========================\nSigning in for existing user");
		signin(driver, myUserName, myPassword); // valid inputs for existing user
		dismissAlert(driver);
		checkNavbarSignedIn(driver); // check for successful sign in
		System.out.println("==========================\nLogging out for existing user");
		logout(driver);
		checkNavbarLoggedOut(driver); // check for successful log out
		
		for (int i=0; i<10; i++) {
			openPopup(driver);
			nonexistentUserTest(driver); // random inputs for inexistent user
			exitPopup(driver);
		}

		for (int i=0; i<10; i++) {
			openPopup(driver);
			wrongPasswordTest(driver); // random passwords for existing user
			exitPopup(driver);
		}

		openPopup(driver);
		emptyFieldsTest(driver); 
		exitPopup(driver);

		System.out.println("Testing of SigninPopup complete!"); 
	}

	private static void wrongPasswordTest(WebDriver driver) {
		try {
			System.out.println("==========================\nEntering random passwords for existing user");
			signin(driver, myUserName, randomText());
			Thread.sleep(sleepDuration);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
	}

	private static void nonexistentUserTest(WebDriver driver) {
		try {
			System.out.println("==========================\nEntering random fields for non-existent user");
			signin(driver, randomText(), randomText());
			dismissAlert(driver);
			Thread.sleep(sleepDuration);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	private static void checkNavbarLoggedOut(WebDriver driver) {
		try {
			// check if navbar updates to logged out version 
			if (driver.findElements(By.id("signup-button")).isEmpty() || driver.findElements(By.id("signin-button")).isEmpty()) {
				System.out.println("logged out navbar failed to generate!"); 
			} else {
				System.out.println("logged out navbar is displayed successfully!"); 
			}
			Thread.sleep(sleepDuration);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	private static void checkNavbarSignedIn(WebDriver driver) {
		try {
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
			if (displayedUsername.equals(myUserName)) {
				System.out.println("username is displayed successfully!"); 
			} else {
				System.out.println("username failed to be displayed!"); 
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	private static void emptyFieldsTest(WebDriver driver) {
		try {
			System.out.println("==========================\nTesting for empty fields");
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
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	private static void logout(WebDriver driver) {
		try {
			// click logout button on navbar 
			driver.findElement(By.id("profile-dropdown-logout")).click();			
			System.out.println("logged out!");
			Thread.sleep(sleepDuration);
			dismissAlert(driver);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	private static void signin(WebDriver driver, String username, String password) {
		try {
			// fill in credentials field
			driver.findElement(By.id("signin-creds")).sendKeys(username);
			Thread.sleep(sleepDuration);
			// fill in password field
			driver.findElement(By.id("signin-password")).sendKeys(password);
			Thread.sleep(sleepDuration);
			// click signin button on popup to submit
			driver.findElement(By.id("popup-button")).click();
			System.out.println("popup-button clicked!");
			Thread.sleep(sleepDuration);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static void openPopup(WebDriver driver) {
		try {
			// click signin button on navbar to trigger signinpopup
			driver.findElement(By.id("signin-button")).click();
			System.out.println("signin-button clicked!");
			Thread.sleep(sleepDuration);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static void exitPopup(WebDriver driver) {
		try {
			// click cross button to exit popup 
			driver.findElement(By.id("popup-cross-icon")).click();
			if (driver.findElements(By.id("signin-popup")).isEmpty() && driver.findElements(By.id("signinpopup-background")).isEmpty()) {
				System.out.println("signin popup closed successfully!"); 
			} else {
				System.out.println("signin popup failed to close!"); 
			}
			Thread.sleep(sleepDuration);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
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
}
