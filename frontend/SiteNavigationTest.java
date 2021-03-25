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
	
	static String myUserName = "kewennnnn";
	static String myPassword = "Password!!!";

	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		String rootAddresss = "http://localhost:3000/";
		driver.get(rootAddresss);
		Thread.sleep(1000);

		// click signup button on navbar to go to signup page
		driver.findElement(By.id("signup-button")).click();
		System.out.println("signup-button clicked!");
		System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss+"signup");
		Thread.sleep(1000);
		// if (driver.getCurrentUrl() != "http://localhost:3000/signup") {
		// 	System.out.println("Error: Navigated to "+driver.getCurrentUrl()+" instead of "+rootAddresss+"signup"); 
		// } else {
		// 	System.out.println("Navigated successfully to "+rootAddresss+"signup");
		// }
		
		// click Scratchbac logo on navbar to go back to homepage 
		driver.findElement(By.id("nav-brand")).click();
		System.out.println("nav-brand clicked!");
		System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss);
		Thread.sleep(1000);

		// signin so we cancreate post
		driver.findElement(By.id("signin-button")).click();
		driver.findElement(By.id("signin-creds")).sendKeys("kewennnnn");
		driver.findElement(By.id("signin-password")).sendKeys("Password1");
		driver.findElement(By.id("signin-popup-button")).click();
		driver.switchTo().alert().accept();
		System.out.println("signed in!");
		Thread.sleep(1000);
		
		// click create post button to go to createpost page
		driver.findElement(By.id("create-post-button")).click();
		System.out.println("create-post-button clicked!");
		System.out.println("Navigated to: "+driver.getCurrentUrl()+"\nExpected:     "+rootAddresss+"createpost");
		Thread.sleep(1000);
		
	}
}
