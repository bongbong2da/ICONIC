package io.iconic.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "log_request")
@ToString
@SequenceGenerator(name = "gen_seq_log_request",
sequenceName = "seq_log_request",
allocationSize = 1,
initialValue = 0)
public class LogRequest {

    @Id
    @Column(name = "idx")
    @GeneratedValue(generator = "gen_seq_log_request",
                    strategy = GenerationType.IDENTITY)
    private int idx;

    @Column(name = "ip")
    private String ip;

    @Column(name = "method")
    private String method;

    @Column(name = "url")
    private String url;

    @Column(name = "regdate")
    private Date regdate;

    public LogRequest(String ip, String method, String url, Date regdate) {
        this.ip = ip;
        this.method = method;
        this.url = url;
        this.regdate = regdate;
    }

    public LogRequest() {

    }
}
