package bitcamp.backend.register;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import bitcamp.backend.register.service.DoctorService;

@CrossOrigin("*")
@EnableTransactionManagement
@SpringBootApplication
@ComponentScan("bitcamp.backend.register")
@RestController
public class app {

  @Autowired
  DoctorService doctorService;

  public static void main(String args[]) {
    SpringApplication.run(app.class, args);
  }
  //
  //  @GetMapping("/hello")
  //  public String hello() {
  //    System.out.println(10);
  //    Doctor doctor = new Doctor();
  //
  //    doctor.setId("2");
  //    doctor.setPassword("1");
  //    doctor.setBirth(new Date(1));
  //    doctor.setName("1");
  //    doctor.setEmail("1");
  //    doctor.setAddr("1");
  //    doctor.setTel("1");
  //    //    doctor.setGender("1");
  //
  //    doctorService.add(doctor);
  //
  //    return ("Hello World!!");
  //  }

  //  @GetMapping("/patient-test")
  //  public String hello2() {
  //    System.out.println(10);
  //    Doctor doctor = new Doctor();

  //    pati.setId("2");
  //    doctor.setPassword("1");
  //    doctor.setBirth(new Date(1));
  //    doctor.setName("1");
  //    doctor.setEmail("1");
  //    doctor.setAddr("1");
  //    doctor.setTel("1");
  //    doctor.setGender("1");

  //    doctorService.add(doctor);
  //
  //    return ("Hello World!!");
  //  }

}
