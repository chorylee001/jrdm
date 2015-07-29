package com.wiseweb.jrdm.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by chory on 2015/7/27 0027.
 */
@Controller
public class LoginAct {

    @RequestMapping(value = "login" , method = RequestMethod.GET)
    public String login(){
        return "login";
    }
    @RequestMapping(value = "login.do" , method = RequestMethod.POST)
    public String login(String name,String pwd){

        return "login";
    }


}
