package com.fernando.jwt.service;

import com.fernando.jwt.dao.RoleDao;
import com.fernando.jwt.dao.UserDao;
import com.fernando.jwt.entity.Role;
import com.fernando.jwt.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    public User registerNewUser(User user) {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(adminRole);
        user.setRole(userRoles);

        return userDao.save(user);
    }


}
