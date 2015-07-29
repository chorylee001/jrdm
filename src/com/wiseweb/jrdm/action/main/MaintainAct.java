package com.wiseweb.jrdm.action.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by chory on 2015/7/28 0028.
 */
@Controller
public class MaintainAct {

    @RequestMapping(value = "/maintain/list" , method = RequestMethod.POST)
    public String list(){

        return "maintain/list";
    }
}
