package com.example.seleniumex;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.List;
import org.openqa.selenium.NoSuchElementException;
import java.util.Random;

public class CommentTest {

    public static void main(String[] args) throws InterruptedException {

        // this test is conducted with the assumption that user has an existing account

        System.setProperty("webdriver.chrome.driver","C:/Users/JH/Desktop/chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:3000/");
        // driver.get("http://scratchtest.ddns.net/");

        // click signin button on navbar to trigger signinpopup
        driver.findElement(By.id("signin-button")).click();
        System.out.println("signin-button clicked!");
        Thread.sleep(1000);

        // fill in credentials field
        driver.findElement(By.id("signin-creds")).sendKeys("sff");
        Thread.sleep(1000);

        // fill in password field
        driver.findElement(By.id("signin-password")).sendKeys("000");
        Thread.sleep(1000);

        // click signin button on popup to submit
        driver.findElement(By.id("popup-button")).click();
        System.out.println("signin-popup-button clicked!");
        Thread.sleep(1000);

        // dismiss alert for successful signin
        driver.switchTo().alert().accept();
        System.out.println("alert dismissed!");
        Thread.sleep(3000);

        // get all event cards, then choose one at random to comment
        List<WebElement> events = driver.findElements(By.className("customCard"));
        Random next = new Random();
        if (events.size() > 0) {
            for (int i = 0; i < 5; i++) {
                // System.out.println(events);
                WebElement nextPost = events.get(next.nextInt(events.size()));
                WebDriverWait wait = new WebDriverWait(driver, 10);
                wait.until(ExpectedConditions.elementToBeClickable(nextPost));
                nextPost.click();

                Thread.sleep(1000);

                System.out.println("---------- Testing parent comments ----------");
                WebElement parentComment = driver.findElement(By.id("pComment"));
                parentComment.sendKeys( Generator.generateRandomComment(i * 3));      // i=0 would send in an empty string, but the submit button will not appear if empty string
                try {
                    WebElement parentSubmit = driver.findElement(By.id("pComment-button"));
                    parentSubmit.click();
                } catch (NoSuchElementException e) {
                    if (i == 0) {
                        System.out.println("Parent comment box is empty string, hence parent-comment-submit button is disabled.\n");
                        Thread.sleep(2000);
                        System.out.println("Testing string with only whitespace");
                        parentComment.sendKeys("                      ");
                        Thread.sleep(500);
                        WebElement parentSubmit = driver.findElement(By.id("pComment-button"));
                        parentSubmit.click();
                        System.out.println("Submit button appears and is clicked, but the comment is not submitted.");
                    } else {
                        System.out.println("Error!");
                    }
                }

                Thread.sleep(2000);

                System.out.println("---------- Testing child comments ----------");
                List<WebElement> childComments = driver.findElements(By.id("cCommentForm"));
                if (childComments.size() > 0) {
                    WebElement childComment = childComments.get(next.nextInt(childComments.size()));
                    WebElement childCommentForm = childComment.findElement(By.id("cComment"));
                    childCommentForm.sendKeys(Generator.generateRandomComment(i * 3));   // i=0 would send in an empty string, but the submit button will not appear if empty string
                    try {
                        WebElement childSubmit = childComment.findElement(By.id("cComment-button"));
                        childSubmit.click();
                    } catch (NoSuchElementException e) {
                        if (i == 0) {
                            System.out.println("Child comment box is empty string, hence child-comment-submit button is disabled.\n");
                        } else {
                            System.out.println("Error!");
                        }
                    }
                } else {
                    System.out.println("No parent comments, hence no child-comment-box.");
                    System.out.println("Moving on to next iteration.\n");
                }
                Thread.sleep(2000);

                // go back and choose next post to comment
                driver.navigate().to("http://localhost:3000/");
                Thread.sleep(3000);
                events = driver.findElements(By.className("customCard"));
            }
        }
        else {
            System.out.println("No posts to comment.");
        }
    }
}

class Generator {
    public static String generateRandomComment(int len) {
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
                +"lmnopqrstuvwxyz!@#$%&" + "      ";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }
}