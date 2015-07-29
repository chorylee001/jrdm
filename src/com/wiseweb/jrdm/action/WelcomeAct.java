package com.wiseweb.jrdm.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * Created by chory on 2015/7/28 0028.
 */
@Controller
public class WelcomeAct {

    @RequestMapping(value = "/index" , method = RequestMethod.GET)
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/index" , method = RequestMethod.POST)
    public String index(String username,String password){

        return "index";
    }
}
