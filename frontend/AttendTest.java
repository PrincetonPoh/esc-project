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

public class AttendTest {
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
        String username = "sff";
        driver.findElement(By.id("signin-creds")).sendKeys(username);
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

        for (int i = 0; i < 5; i++) {
            // System.out.println(events);
            WebElement nextPost = events.get(next.nextInt(events.size()));
            String postId = nextPost.getAttribute("id");
            WebDriverWait wait = new WebDriverWait(driver, 10);
            wait.until(ExpectedConditions.elementToBeClickable(nextPost));
            nextPost.click();

            Thread.sleep(1000);

            System.out.println("---------- Testing attendance ----------");
            try {
                WebElement attendButton = driver.findElement(By.className("attending-button"));
                String id = attendButton.getAttribute("id");
                // System.out.println(id);

                if (id.equals("attend-button")) {
                    System.out.println("I have not attended this event. I shall attend it.");
                }
                else if (id.equals("unattend-button")) {
                    System.out.println("I am attending this event. I shall not attend it");
                }
                Thread.sleep(1000);
                WebElement showAttendance = driver.findElement(By.id("toggle-attendees"));
                showAttendance.click();
                try {
                    WebElement me = showAttendance.findElement(By.id(username));

                    if (id.equals("unattend-button")) {
                        System.out.println("I am confirmed to be in the attendance list.");
                    }
                    else {
                        throw new InterruptedException("Attendance list issue.");
                    }
                } catch (NoSuchElementException e) {
                    if (id.equals("attend-button")) {
                        System.out.println("I am confirmed to not be in the attendance list.");
                    }
                    else {
                        throw new InterruptedException("Attendance list issue.");
                    }
                }
                Thread.sleep(2000);
                attendButton.click();
                Thread.sleep(500);

                if (id.equals(attendButton.getAttribute("id"))) {
                    throw new InterruptedException("Attend button not working.");
                }
                else {
                    System.out.println(id + " has successfully changed to " + attendButton.getAttribute("id"));
                    Thread.sleep(1000);
                }

                // update id
                id = attendButton.getAttribute("id");

                try {
                    WebElement me = showAttendance.findElement(By.id(username));

                    if (id.equals("unattend-button")) {
                        System.out.println("I am now in the attendance list.");
                    }
                    else {
                        throw new InterruptedException("Attendance list issue.");
                    }
                } catch (NoSuchElementException e) {
                    if (id.equals("attend-button")) {
                        System.out.println("I am now not in the attendance list.");
                    }
                    else {
                        throw new InterruptedException("Attendance list issue.");
                    }
                }
                int attendanceNo = 0;
                try {
                    WebElement empty = showAttendance.findElement(By.id("none"));
                } catch (NoSuchElementException e) {
                    attendanceNo = showAttendance.findElements(By.tagName("li")).size();
                }
                Thread.sleep(2000);
                System.out.println("Current attendance number: " + attendanceNo);
                System.out.println("Next, testing if this post appears in my profile.");
                driver.findElement(By.id("profile-button")).click();
                driver.findElement(By.id("profile-dropdown-userpage")).click();

                Thread.sleep(2000);
                driver.findElement(By.id("profile-button")).click();
                try {
                    // System.out.println(driver.getCurrentUrl());
                    WebElement post = driver.findElement(By.id(postId));
                    // System.out.println(post.getAttribute("id"));
                    if (id.equals("unattend-button")) {
                        System.out.println("Post confirmed to be on my profile.");
                        System.out.println(post.findElement(By.id("attendanceNo")).getText());
                        String currentNo = post.findElement(By.id("attendanceNo")).getText().replaceAll("[^0-9]", "");
                        if (currentNo.equals(Integer.toString(attendanceNo))) {
                            System.out.println("No. of attendees are also ascertained to be correct.");
                        }
                        else {
                            throw new InterruptedException("No. of attendees wrong");
                        }
                    }
                    else {
                        throw new InterruptedException("Profile page error");
                    }
                } catch (NoSuchElementException e) {
                    if (id.equals("attend-button")) {
                        System.out.println("Post confirmed to not be on my profile.");
                    }
                    else {
                        throw new InterruptedException("Profile page error");
                    }
                }
                Thread.sleep(1000);
                System.out.println("Next, testing my own posts.");
                WebElement postCol = driver.findElement(By.id("myEvents"));
                List<WebElement> myPosts = postCol.findElements(By.className("customCard"));
                if (myPosts.size() == 0) {
                    System.out.println("I have not made any posts.");
                    System.out.println("Restarting test.");
                }
                else {
                    WebElement nextMyPost = myPosts.get(next.nextInt(myPosts.size()));
                    // System.out.println(nextMyPost.getAttribute("id"));
                    String myPostAttendance = nextMyPost.findElement(By.id("attendanceNo")).getText().replaceAll("[^0-9]", "");
                    nextMyPost.findElement(By.id("checkAttendance")).click();
                    Thread.sleep(500);
                    int count = 0;
                    try {
                        WebElement empty = driver.findElement(By.id("none"));
                    } catch (NoSuchElementException e) {
                        count = driver.findElements(By.tagName("li")).size();
                    }
                    if (count == Integer.parseInt(myPostAttendance)) {
                        System.out.println("Attendance number is ascertained to be correct.");
                    }
                    else {
                        throw new InterruptedException("Attendance number is wrong.");
                    }
                    Thread.sleep(2000);
                    driver.findElement(By.id("popup-cross-icon")).click();
                    nextMyPost.click();
                    throw new NoSuchElementException("Proceed");
                }


            } catch (NoSuchElementException e) {
                System.out.println("This is my own post.");
                Thread.sleep(1000);
                System.out.println("As owner of the event, I am implied to be attending, hence there will be no attend-button.");
                Thread.sleep(1000);
                System.out.println("Continuing with test...");
            }

            // go back and choose next post to comment
            driver.navigate().to("http://localhost:3000/");
            Thread.sleep(3000);
            events = driver.findElements(By.className("customCard"));
        }
    }
}
