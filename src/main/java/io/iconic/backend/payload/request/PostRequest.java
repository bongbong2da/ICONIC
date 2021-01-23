package io.iconic.backend.payload.request;

public class PostRequest {

    private int post_writer_id;

    private String rep_icon;

    private String post_text;

    private String post_attach;

    private String post_attach_type;

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
