create table users(
                      id double primary key ,
                      username varchar(4000),
                      password varchar(4000),
                      regdate datetime default sysdate(),
                      profile_img varchar(4000),
                      logindate datetime
);

create table roles(
                      id double primary key ,
                      name varchar(4000)
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
                         posting_title varchar(4000),
                         posting_writer varchar(4000),
                         posting_emoji varchar(4000),
                         posting_content varchar(4000),
                         posting_isAttached char(1),
                         posting_attach varchar(4000),
                         posting_reg datetime
);

create sequence seq_posting_idx
    start with 0
    minvalue 0
    increment by 1;

create table posting_comment (
                                 comment_idx double primary key ,
                                 posting_idx double,
                                 comment_emoji varchar(4000),
                                 comment_content varchar(4000),
                                 comment_reg datetime default sysdate(),
                                 comment_writer varchar(4000)
);

create sequence seq_comment_idx
    start with 0
    minvalue 0
    increment by 1;

create table users_friends (
                               username varchar(4000),
                               friendName varchar(4000)
);

create table users_channel (
                               idx double primary key,
                               username varchar(4000),
                               channel_idx double
);

create sequence seq_users_channel_idx
    start with 0
    minvalue 0
    increment by 1;

create table log_request (
                             idx double primary key ,
                             ip varchar(4000),
                             method varchar(4000),
                             url varchar(4000),
                             regDate datetime default sysdate()
);

create sequence seq_log_request
    minvalue 0
    start with 0
    increment by 1;

create table channels (
                          chan_idx double primary key,
                          chan_type varchar(4000),
                          chan_name varchar(4000),
                          chan_emoji varchar(4000),
                          chan_pop_max double,
                          chan_announce varchar(4000),
                          chan_manager varchar(4000),
                          chan_isPublic char(1),
                          chan_reg datetime,
                          chan_code varchar(4000)
);

insert into channels values (1, 'public', '공용 채널', '🦔', 50, '테스트 공지사항', 'test', 'y', sysdate());
insert into channels values (2, 'users', '맹글어온 채널', '🍀', 50, '테스트 공지사항', 'test', 'y', sysdate());
commit;