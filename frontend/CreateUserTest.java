import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.Random;

public class CreateUserTest {
    static int sleepDuration = 100;
    static String[] formInputFields = {"formPlaintextEmail","formGroupLastName","formGroupUserName","formGroupHP", "formGroupEmail", "formGroupPassword", "formGroupConfirmPassword"};

    public static void main(String args[]) {
        System.setProperty("webdriver.chrome.driver","C:/Users/Yk/Desktop/ChromeDriver/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/");
        try{
            createUser(driver);
        } catch(Exception e){
            e.printStackTrace();
        }
        System.out.println("End of testing");
    }

    private static void createUser(WebDriver driver) throws InterruptedException {
        System.out.println("==========================\nFilling in random inputs");

        // go to create post page
        driver.findElement(By.id("signup-button")).click();
        Thread.sleep(sleepDuration);

        String password = randomText();
        List<WebElement> signupFormInput = driver.findElements(By.className("signup-form-input"));
        for(int i = 0; i < signupFormInput.size(); i ++){
            if(i< signupFormInput.size()-2){
                signupFormInput.get(i).sendKeys(randomText());
                Thread.sleep(sleepDuration);
            } else{
                signupFormInput.get(i).sendKeys(password);
                Thread.sleep(sleepDuration);
            }
        }
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
