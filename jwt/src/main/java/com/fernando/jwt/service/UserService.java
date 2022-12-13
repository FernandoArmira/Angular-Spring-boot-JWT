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

    public User registerNewUser(User user) {

        Role adminRole = new Role();
        adminRole.setRoleName("user");
        adminRole.setRoleDescription("Default role");

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(adminRole);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        return userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }



}
