package io.iconic.backend.interceptor;

import io.iconic.backend.model.LogRequest;
import io.iconic.backend.repository.LogRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

@Component
public class CommonInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private LogRequestRepository logRequestRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String ip = request.getRemoteAddr();
        String method = request.getMethod();
        String url = request.getRequestURI();

        LogRequest logRequest = new LogRequest(ip, method, url, new Date());

        System.out.println(logRequest);

        try {
            logRequestRepository.save(logRequest);
        } catch (Exception e) {
            System.out.println("can't pass");
            e.printStackTrace();
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }
}
