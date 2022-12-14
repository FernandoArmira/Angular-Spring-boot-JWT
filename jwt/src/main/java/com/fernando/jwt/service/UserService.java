package com.fernando.jwt.service;

import com.fernando.jwt.dao.RoleDao;
import com.fernando.jwt.dao.UserDao;
import com.fernando.jwt.entity.Role;
import com.fernando.jwt.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /*
    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("admin");
        adminRole.setRoleDescription("Admin role");

        User adminUser = new User();
        adminUser.setUserName("fer");
        adminUser.setUserPassword(getEncodedPassword("123"));
        adminUser.setUserFirstName("fernando");
        adminUser.setUserLastName("armira");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        Role userRole = new Role();
        userRole.setRoleName("user");
        userRole.setRoleDescription("Default role");

        User user = new User();
        user.setUserName("maria");
        user.setUserPassword(getEncodedPassword("123"));
        user.setUserFirstName("maria");
        user.setUserLastName("morales");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);
    }*/

    public User registerNewUser(User user) {

        Role role = roleDao.findById("user").get();

        //Role adminRole = new Role();
        //adminRole.setRoleName("user");
        //adminRole.setRoleDescription("Default role");

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        return userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }



}
