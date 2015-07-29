package com.wiseweb.jrdm.action.main;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by chory on 2015/7/28 0028.
 */
@Controller
public class CheckAct {

    @RequestMapping(value = "/check/list")
    public String list(){

        return "check/list";
    }
    @RequestMapping(value = "/check/list" , method = RequestMethod.POST)
    public String list(ModelMap modelMap){

        return "check/list";
    }
}
