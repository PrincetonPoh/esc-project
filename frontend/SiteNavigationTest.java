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

public class SiteNavigationTest {
	
	static String myUserName = "kewendev";
	static String myPassword = "passw0rd";
	static int sleepDuration = 1000;
	static int errorCount = 0;

	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		String rootAddresss = "http://localhost:3000/";
		// String rootAddresss = "http://scratchtest.ddns.net/";
		driver.get(rootAddresss);
		Thread.sleep(sleepDuration);

		// click signup button on navbar to go to signup page
		try {
			driver.findElement(By.id("signup-button")).click();
			System.out.println("signup-button clicked!");
			System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss+"signup");
			Thread.sleep(sleepDuration);
		} catch (Exception e) {
			System.out.println("Could not go to "+rootAddresss+"signup");
			e.printStackTrace();
			errorCount++;
		}
		
		
		// click Scratchbac logo on navbar to go back to homepage 
		try {
			driver.findElement(By.id("nav-brand")).click();
			System.out.println("nav-brand clicked!");
			System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss);
			Thread.sleep(sleepDuration);
		} catch (Exception e) {
			System.out.println("Could not go to "+rootAddresss);
			e.printStackTrace();
			errorCount++;
		}

		// signin so we can create post
		try {
			driver.findElement(By.id("signin-button")).click();
			driver.findElement(By.id("signin-creds")).sendKeys(myUserName);
			driver.findElement(By.id("signin-password")).sendKeys(myPassword);
			driver.findElement(By.id("popup-button")).click();
			WebDriverWait wait = new WebDriverWait(driver, 15);
			wait.until(ExpectedConditions.alertIsPresent());
			driver.switchTo().alert().accept();
			System.out.println("signed in!");
			Thread.sleep(sleepDuration);
		} catch (Exception e) {
			System.out.println("Could not sign in");
			e.printStackTrace();
			errorCount++;
		}

		// click create post button to go to createpost page
		try {
			driver.findElement(By.id("create-post-button")).click();
			System.out.println("create-post-button clicked!");
			System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss+"createpost");
			Thread.sleep(sleepDuration);
		} catch (Exception e) {
			System.out.println("Could not go to "+rootAddresss+"createpost");
			e.printStackTrace();
			errorCount++;
		}

		// click profile dropdown so we can go to user page 
		try {
			driver.findElement(By.id("profile-button")).click();
			Thread.sleep(sleepDuration);
			driver.findElement(By.id("profile-dropdown-userpage")).click();
			System.out.println("profile-dropdown-userpage clicked!");
			System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss+"user/ <user_id appears here>");
		} catch (Exception e) {
			System.out.println("Could not go to user page");
			e.printStackTrace();
			errorCount++;
		}

		System.out.println("SiteNavigationTest complete! Number of errors: "+errorCount); 
	}
}
