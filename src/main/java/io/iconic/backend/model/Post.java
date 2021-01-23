package io.iconic.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "post_tbl")
@SequenceGenerator(name = "seq_post_id_gen",
sequenceName = "seq_post_id",
initialValue = 0,
allocationSize = 1)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "seq_post_id_gen")
    private int post_id;

    private int post_writer_id;

    private String rep_icon;

    private String post_text;

    private String post_attach;

    private String post_attach_type;

    public Post(){}

    public Post(int post_writer_id, String rep_icon, String post_text, String post_attach, String post_attach_type) {
        this.post_writer_id = post_writer_id;
        this.rep_icon = rep_icon;
        this.post_text = post_text;
        this.post_attach = post_attach;
        this.post_attach_type = post_attach_type;
    }

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    public int getPost_writer_id() {
        return post_writer_id;
    }

    public void setPost_writer_id(int post_writer_id) {
        this.post_writer_id = post_writer_id;
    }

    public String getRep_icon() {
        return rep_icon;
    }

    public void setRep_icon(String rep_icon) {
        this.rep_icon = rep_icon;
    }

    public String getPost_text() {
        return post_text;
    }

    public void setPost_text(String post_text) {
        this.post_text = post_text;
    }

    public String getPost_attach() {
        return post_attach;
    }

    public void setPost_attach(String post_attach) {
        this.post_attach = post_attach;
    }

    public String getPost_attach_type() {
        return post_attach_type;
    }

    public void setPost_attach_type(String post_attach_type) {
        this.post_attach_type = post_attach_type;
    }
}
