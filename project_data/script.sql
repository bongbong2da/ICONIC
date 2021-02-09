create table users(
                      id number primary key ,
                      username varchar2(4000),
                      password varchar2(4000)
);

alter table users add regdate date;
alter table users add profile_img varchar2(4000);
alter table users add logindate date;

commit;

create table roles(
                      id number primary key ,
                      name varchar2(4000)
);

create table user_roles(
                           user_id number,
                           role_id number,
                           constraint pk_user_roles primary key (user_id, role_id)
);

commit;

create sequence seq_user_idx
    start with 0
    minvalue 0
    increment by 1;

commit;
drop table user_roles;

create table user_roles (
                            user_id number,
                            role_id number
);

create sequence seq_channel_idx
    start with 2
    minvalue 0
    increment by 1;

create table created_channels (
                                  cChan_idx number primary key,
                                  cChan_name varchar2(4000),
                                  cChan_pop_max number,
                                  cChan_announce varchar2(4000),
                                  cChan_manager varchar2(4000),
                                  cChan_isPublic char(1),
                                  cChan_reg date
);

insert into CREATED_CHANNELS values (seq_cChan_idx.nextval, 'First Test Channel', 50, 'First Channel Accouncement',
                                     'test', '1', sysdate);

create sequence seq_cChan_idx
    start with 0
    minvalue 0
    increment by 1;

create table public_channels (
                                 pChan_idx number primary key ,
                                 pChan_name varchar2(4000),
                                 pChan_pop_max number,
                                 pChan_announce varchar2(4000),
                                 pChan_manager varchar2(4000),
                                 pChan_isPublic char(1),
                                 pChan_reg date
);

insert into public_channels values (seq_pChan_idx.nextval, 'First public Channel', 50, 'First Channel Accouncement',
                                    'test', '1', sysdate);

create sequence seq_pChan_idx
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

insert into posting values (seq_posting_idx.nextval, 1, 'first test post', 'test', '^_^', 'contents...', 'n', '', sysdate);

create sequence seq_posting_idx
    start with 0
    minvalue 0
    increment by 1;

create table posting_reply (
                               reply_idx number primary key ,
                               posting_idx number,
                               reply_emoji varchar2(4000),
                               reply_content varchar2(4000),
                               reply_reg date
);

create sequence seq_reply_idx
    start with 0
    minvalue 0
    increment by 1;

create table users_friends (
                               username varchar2(4000),
                               friendName varchar2(4000)
);

create table users_channel (
                               username varchar2(4000),
                               channel_idx number
);

create sequence seq_users_channel
    start with 2
    minvalue 0
    increment by 1;

alter table users_channel add idx number;

drop table users_channel;

insert into users_channel values ('test', 1);

drop table users_channel;

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

commit;

select ip , count(*) from log_request group by (ip);

create table channels (
                          chan_idx number primary key,
                          chan_type varchar2(4000),
                          chan_name varchar2(4000),
                          chan_emoji varchar2(4000),
                          chan_pop_max number,
                          chan_announce varchar2(4000),
                          chan_manager varchar2(4000),
                          chan_isPublic char(1),
                          chan_reg date
);

insert into channels values (1, 'public', '공용 채널', '🦔', 50, '테스트 공지사항', 'test', 'y', sysdate);
insert into channels values (2, 'users', '맹글어온 채널', '🍀', 50, '테스트 공지사항', 'test', 'y', sysdate);
commit;

insert into users_channel values ('test2', 2, seq_channel_idx.nextval);