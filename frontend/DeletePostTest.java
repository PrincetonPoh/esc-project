import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeletePostTest {
	
	static String myUserName = "kewendev";
	static String myPassword = "passw0rd";
	static int sleepDuration = 100;

	public static void main(String[] args) throws InterruptedException {	

		System.setProperty("webdriver.chrome.driver","/Users/kewen/Downloads/Installers/chromedriver_win32/chromedriver.exe"); 
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/");
		// driver.get("http://scratchtest.ddns.net/");

		signIn(driver);

		// deleteRandomPost(driver);
		for (int i=0; i<10; i++) {
			deleteRandomPost(driver);
		}

		System.out.println("Testing of Deleting Posts complete!"); 
	}

	static void deleteRandomPost(WebDriver driver) throws InterruptedException {
		System.out.println("==========================\nDeleting a random post");

		// go to user page 
		navigateToUserPage(driver);

		java.util.List<WebElement> deleteButtonList = driver.findElements(By.className("customCardDeleteIcon"));
		int initialNumOfPosts = deleteButtonList.size();
		if (initialNumOfPosts == 0) {
			System.out.println("No posts to delete!");
			return;
		}
		System.out.println("Number of posts on page before deleting = "+initialNumOfPosts);
		Random random = new Random(); 
		int indexToDelete = random.nextInt(initialNumOfPosts); 
		boolean deleted = false; 
		while (!deleted) {
			try {
				deleteButtonList.get(indexToDelete).click();
				driver.findElement(By.id("popup-button")).click();
				dismissAlert(driver);
				deleted = true; 
			} catch (Exception e) {
				navigateToUserPage(driver);
				indexToDelete = random.nextInt(initialNumOfPosts); 
			}
		}
		int finalNumOfPosts = driver.findElements(By.className("customCardDeleteIcon")).size();
		System.out.println("Number of posts on page after deleting = "+finalNumOfPosts);
		
		
	}

	static void navigateToUserPage(WebDriver driver) {
		try {
			driver.findElement(By.id("profile-button")).click();
			Thread.sleep(sleepDuration);
			driver.findElement(By.id("profile-dropdown-userpage")).click();
			driver.findElement(By.id("profile-button")).click();
		} catch (Exception e) {
			System.out.println("Could not go to user page");
		}
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
}
