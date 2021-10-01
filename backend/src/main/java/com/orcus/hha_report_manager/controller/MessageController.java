package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.model.Message;
import com.orcus.hha_report_manager.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAllMessages(@RequestParam(required = false) String department) {
        try {
            List<Message> messages = new ArrayList<Message>();

            if (department == null)
                messageRepository.findAll().forEach(messages::add);
            else
                messageRepository.findByDepartmentContains(department).forEach(messages::add);

            if (messages.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(messages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable("id") long id) {
        Optional<Message> messageData = messageRepository.findById(id);

        if (messageData.isPresent()) {
            return new ResponseEntity<>(messageData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        try {
            Message newMessage = messageRepository
                    .save(new Message(message.getUsername(), message.getFirstName(), message.getLastName(), message.getDepartment(), LocalDateTime.now(), message.getContent()));
            return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/messages/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable("id") long id, @RequestBody Message message) {
        Optional<Message> messageData = messageRepository.findById(id);

        if (messageData.isPresent()) {
            Message messageToChange = messageData.get();
            messageToChange.setUsername(message.getUsername());
            messageToChange.setFirstName(message.getFirstName());
            messageToChange.setLastName(message.getLastName());
            messageToChange.setDepartment(message.getDepartment());
            messageToChange.setTimestamp(LocalDateTime.now());
            messageToChange.setContent(message.getContent());
            return new ResponseEntity<>(messageRepository.save(messageToChange), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<HttpStatus> deleteMessage(@PathVariable("id") long id) {
        try {
            messageRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/messages")
    public ResponseEntity<HttpStatus> deleteAllMessages() {
        try {
            messageRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

//    @GetMapping("/messages/departmentheads")
//    public ResponseEntity<List<Employee>> findByPublished() {
//        try {
//            List<Employee> employees = employeeRepository.findByIsDepartmentHead(true);
//
//            if (employees.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(employees, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}