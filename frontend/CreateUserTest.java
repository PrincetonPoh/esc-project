import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.List;
import java.util.Random;

public class CreateUserTest {
    static int sleepDuration = 100;
    static String[] formInputFields = {"formPlaintextEmail","formGroupLastName","formGroupUserName","formGroupHP", "formGroupEmail", "formGroupPassword", "formGroupConfirmPassword"};
    private WebDriver driver;
    @Before
    public void init() {
        System.setProperty("webdriver.chrome.driver","C:/Users/Yk/Desktop/ChromeDriver/chromedriver.exe");
        driver = new ChromeDriver();
        driver.get("http://localhost:3000/");
    }

    @Test
    public void invalidInputs() throws InterruptedException {
        System.out.println("==========================\nFilling in random inputs");

        // go to create post page
        driver.findElement(By.id("signup-button")).click();
        Thread.sleep(sleepDuration);

        String password = randomText();
        List<WebElement> signupFormInput = driver.findElements(By.className("signup-form-input"));
        System.out.println("Total signupFormInput is " + signupFormInput.size());
        for(int i = 0; i < signupFormInput.size(); i ++){
            if(i< signupFormInput.size()-3){
                signupFormInput.get(i).sendKeys(randomText());
                Thread.sleep(sleepDuration);
            } else if(i == 4){
                System.out.println("Value of i is  " + i);
                signupFormInput.get(i).sendKeys("yk@mail.com");
            }
            else{
                signupFormInput.get(i).sendKeys(password);
                Thread.sleep(sleepDuration);
            }
        }

        driver.findElement(By.id("signup-form-button")).click();
        Thread.sleep(sleepDuration);
        WebElement invalidInputs = null;
        invalidInputs = driver.findElement(By.className("formWarning"));
        assertTrue("Invalid Inputs", (invalidInputs.getText().contains("fill in the required fields")));
    }

    @Test
    public void validInputs() throws InterruptedException {
        System.out.println("==========================\nFilling in random inputs");

        // go to create post page
        driver.findElement(By.id("signup-button")).click();
        Thread.sleep(sleepDuration);

        List<WebElement> signupFormInput = driver.findElements(By.className("signup-form-input"));
        System.out.println("Total signupFormInput is " + signupFormInput.size());
        for(int i = 0; i < signupFormInput.size(); i ++){
            if(i< 3){
                signupFormInput.get(i).sendKeys("yk");
                Thread.sleep(sleepDuration);
            } else if(i == 3){
                signupFormInput.get(i).sendKeys("98765432");
            }
            else if(i == 4){
                System.out.println("Value of i is  " + i);
                signupFormInput.get(i).sendKeys("yk@mail.com");
            }
            else{
                signupFormInput.get(i).sendKeys("password");
                Thread.sleep(sleepDuration);
            }
        }

        driver.findElement(By.id("signup-form-button")).click();
        Thread.sleep(sleepDuration);
        WebElement invalidInputs = null;
        invalidInputs = driver.findElement(By.className("formWarning"));
        assertTrue("Captcha failed", (invalidInputs.getText().contains("ReCAPTCHA")));
    }

    @Test(expected = NoSuchElementException.class)
    public void clickCaptcha() throws InterruptedException {
        System.out.println("==========================\nFilling in random inputs");

        // go to create post page
        driver.findElement(By.id("signup-button")).click();
        Thread.sleep(sleepDuration);

        List<WebElement> signupFormInput = driver.findElements(By.className("signup-form-input"));
        System.out.println("Total signupFormInput is " + signupFormInput.size());
        for(int i = 0; i < signupFormInput.size(); i ++){
            if(i< 3){
                signupFormInput.get(i).sendKeys("ykdev");
                Thread.sleep(sleepDuration);
            } else if(i == 3){
                signupFormInput.get(i).sendKeys("98765432");
            }
            else if(i == 4){
                System.out.println("Value of i is  " + i);
                signupFormInput.get(i).sendKeys("yk@gmail.com");
            }
            else{
                signupFormInput.get(i).sendKeys("password");
                Thread.sleep(sleepDuration);
            }
        }
        driver.findElement(By.id("recaptcha-anchor")).click();
        Thread.sleep(sleepDuration);
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
