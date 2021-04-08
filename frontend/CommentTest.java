package com.example.seleniumex;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.Random;

public class CommentTest {

    public static void main(String[] args) throws InterruptedException {

        // this test is conducted with the assumption that user has already logged in

        System.setProperty("webdriver.chrome.driver", "C:/Users/JH/Desktop/chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:3000/");

        // click signin button on navbar to trigger signinpopup
        driver.findElement(By.id("signin-button")).click();
        System.out.println("signin-button clicked!");
        Thread.sleep(1000);
        // activatePopup();

        // fill in credentials field
        driver.findElement(By.id("signin-creds")).sendKeys("princeton15");
        Thread.sleep(1000);

        // fill in password field
        driver.findElement(By.id("signin-password")).sendKeys("asd123");
        Thread.sleep(1000);

        // click signin button on popup to submit
        driver.findElement(By.id("signin-popup-button")).click();
        System.out.println("signin-popup-button clicked!");
        Thread.sleep(1000);

        // dismiss alert for successful signin
        driver.switchTo().alert().accept();
        System.out.println("alert dismissed!");
        Thread.sleep(1000);

        // get all event cards, then choose one at random to comment
        List<WebElement> events = driver.findElements(By.className("customCard"));
        Random next = new Random();

        for (int i = 0; i < 10; i++) {
            System.out.println(events);
            WebElement nextPost = events.get(next.nextInt(events.size()));
            WebDriverWait wait = new WebDriverWait(driver, 10);
            wait.until(ExpectedConditions.elementToBeClickable(nextPost));
            nextPost.click();

            Thread.sleep(1000);

            WebElement parentComment = driver.findElement(By.id("pComment"));
            parentComment.sendKeys(Generator.generateRandomPassword(i + 10)); // i=0 would send in an empty string, but
                                                                              // the submit button will not be appear if
                                                                              // empty string
            WebElement parentSubmit = driver.findElement(By.id("pComment-button"));
            parentSubmit.click();

            Thread.sleep(3000);

            List<WebElement> childComments = driver.findElements(By.id("cCommentForm"));
            WebElement childComment = childComments.get(next.nextInt(childComments.size()));
            WebElement childCommentForm = childComment.findElement(By.id("cComment"));
            childCommentForm.sendKeys(Generator.generateRandomPassword(i + 10)); // i=0 would send in an empty string,
                                                                                 // but the submit button will not be
                                                                                 // appear if empty string
            WebElement childSubmit = childComment.findElement(By.id("cComment-button"));
            childSubmit.click();

            Thread.sleep(3000);

            driver.navigate().to("http://localhost:3000/");
            events = driver.findElements(By.className("customCard"));
        }
    }
}

class Generator {
    public static String generateRandomPassword(int len) {
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk" + "lmnopqrstuvwxyz!@#$%&";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }
}
