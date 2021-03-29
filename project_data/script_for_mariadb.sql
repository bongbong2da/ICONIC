create table users(
                      id double primary key ,
                      username text,
                      password text,
                      regdate datetime default sysdate(),
                      profile_img text,
                      logindate datetime
);

create table roles(
                      id double primary key ,
                      name text
);

create sequence seq_user_idx
    start with 0
    minvalue 0
    increment by 1;


create table user_roles (
                            user_id double,
                            role_id double
);

create sequence seq_channel_idx
    start with 0
    minvalue 0
    increment by 1;

create table posting (
                         posting_idx double primary key ,
                         posting_chan_idx double,
                         posting_title text,
                         posting_writer text,
                         posting_emoji text,
                         posting_content text,
                         posting_isAttached char(1),
                         posting_attach text,
                         posting_reg datetime
);

create sequence seq_posting_idx
    start with 0
    minvalue 0
    increment by 1;

create table posting_comment (
                                 comment_idx double primary key ,
                                 posting_idx double,
                                 comment_emoji text,
                                 comment_content text,
                                 comment_reg datetime default sysdate(),
                                 comment_writer text
);

create sequence seq_comment_idx
    start with 0
    minvalue 0
    increment by 1;

create table users_friends (
                               username text,
                               friendName text
);

create table users_channel (
                               idx double primary key,
                               username text,
                               channel_idx double
);

create sequence seq_users_channel_idx
    start with 0
    minvalue 0
    increment by 1;

create table log_request (
                             idx double primary key ,
                             ip text,
                             method text,
                             url text,
                             regDate datetime default sysdate()
);

create sequence seq_log_request
    minvalue 0
    start with 0
    increment by 1;

create table channels (
                          chan_idx double primary key,
                          chan_type text,
                          chan_name text,
                          chan_emoji text,
                          chan_pop_max double,
                          chan_announce text,
                          chan_manager text,
                          chan_isPublic char(1),
                          chan_reg datetime,
                          chan_code text
);

create table images (
                        image_idx int primary key ,
                        image_uuid text,
                        image_bytes LONGBLOB
);

create sequence seq_images_idx
    start with 0
    increment by 1
    minvalue 0;

insert into roles values (1, 'ROLE_USER');
insert into roles values (2, 'ROLE_MODERATOR');
insert into roles values (3, 'ROLE_ADMIN');

commit;