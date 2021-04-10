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

	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		String rootAddresss = "http://localhost:3000/";
		// String rootAddresss = "http://scratchtest.ddns.net/";
		driver.get(rootAddresss);
		Thread.sleep(sleepDuration);

		// click signup button on navbar to go to signup page
		driver.findElement(By.id("signup-button")).click();
		System.out.println("signup-button clicked!");
		System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss+"signup");
		Thread.sleep(sleepDuration);
		// if (driver.getCurrentUrl() != "http://localhost:3000/signup") {
		// 	System.out.println("Error: Navigated to "+driver.getCurrentUrl()+" instead of "+rootAddresss+"signup"); 
		// } else {
		// 	System.out.println("Navigated successfully to "+rootAddresss+"signup");
		// }
		
		// click Scratchbac logo on navbar to go back to homepage 
		driver.findElement(By.id("nav-brand")).click();
		System.out.println("nav-brand clicked!");
		System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss);
		Thread.sleep(sleepDuration);

		// signin so we cancreate post
		driver.findElement(By.id("signin-button")).click();
		driver.findElement(By.id("signin-creds")).sendKeys(myUserName);
		driver.findElement(By.id("signin-password")).sendKeys(myPassword);
		driver.findElement(By.id("popup-button")).click();
		WebDriverWait wait = new WebDriverWait(driver, 15);
		wait.until(ExpectedConditions.alertIsPresent());
		driver.switchTo().alert().accept();
		System.out.println("signed in!");
		Thread.sleep(sleepDuration);
		
		// click create post button to go to createpost page
		driver.findElement(By.id("create-post-button")).click();
		System.out.println("create-post-button clicked!");
		System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss+"createpost");
		Thread.sleep(sleepDuration);
		
		System.out.println("SiteNavigationTest complete!"); 
	}
}
