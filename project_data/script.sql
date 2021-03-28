create table users(
                      id number primary key ,
                      username varchar2(4000),
                      password varchar2(4000),
                      regdate date default sysdate,
                      profile_img varchar2(4000),
                      logindate date
);

create table roles(
                      id number primary key ,
                      name varchar2(4000)
);

create sequence seq_user_idx
    start with 0
    minvalue 0
    increment by 1;


create table user_roles (
                            user_id number,
                            role_id number
);

create sequence seq_channel_idx
    start with 0
    minvalue 0
    increment by 1;

create table posting (
                         posting_idx number primary key ,
                         posting_chan_idx number,
                         posting_title varchar2(4000),
                         posting_writer varchar2(4000),
                         posting_emoji varchar2(4000),
                         posting_content varchar2(4000),
                         posting_isAttached char(1),
                         posting_attach varchar2(4000),
                         posting_reg date
);

create sequence seq_posting_idx
    start with 0
    minvalue 0
    increment by 1;

create table posting_comment (
                               comment_idx number primary key ,
                               posting_idx number,
                               comment_emoji varchar2(4000),
                               comment_content varchar2(4000),
                               comment_reg date default sysdate,
                               comment_writer varchar2(4000)
);

create sequence seq_comment_idx
    start with 0
    minvalue 0
    increment by 1;

create table users_friends (
                               username varchar2(4000),
                               friendName varchar2(4000)
);

create table users_channel (
                                idx number primary key,
                               username varchar2(4000),
                               channel_idx number
);

create sequence seq_users_channel_idx
    start with 0
    minvalue 0
    increment by 1;

create table log_request (
                             idx number primary key ,
                             ip varchar2(4000),
                             method varchar2(4000),
                             url varchar2(4000),
                             regDate date default sysdate
);

create sequence seq_log_request
    minvalue 0
    start with 0
    increment by 1;

create table channels (
                          chan_idx number primary key,
                          chan_type varchar2(4000),
                          chan_name varchar2(4000),
                          chan_emoji varchar2(4000),
                          chan_pop_max number,
                          chan_announce varchar2(4000),
                          chan_manager varchar2(4000),
                          chan_isPublic char(1),
                          chan_reg date,
                          chan_code varchar2(4000)
);

insert into channels values (1, 'public', '공용 채널', '🦔', 50, '테스트 공지사항', 'test', 'y', sysdate);
insert into channels values (2, 'users', '맹글어온 채널', '🍀', 50, '테스트 공지사항', 'test', 'y', sysdate);
commit;