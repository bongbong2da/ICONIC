import React, {useEffect, useState} from 'react';
import axios from "axios";
import Posting, {PostingTypes} from "../posting/Posting";
import {Button, Card, Container, Header, Segment} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";


type ChannelListProps = {
    channel_idx: number
}

type PageDataTypes = {
    content : PostingTypes[]
    empty : boolean
    first : boolean
    last : boolean
    number : number
    numberOfElements : number
    pageable : {
        offset : 0
        pageNumber : 0
        pageSize : 10
        paged : true
        sort : {
            empty : boolean
            sorted : boolean
            unsorted : boolean
        }
        unpaged : boolean
    }
    size : number
    sort : {
        empty : boolean
        sorted : boolean
        unsorted : boolean
    }
    totalElements : number
    totalPages : 3
}

const ChannelPostings = (props: ChannelListProps) => {

    //States
    const [postingList, setPostingList] = useState([] as PostingTypes[] | null);
    const [pageData, setPageData] = useState({} as PageDataTypes);
    const [page, setPage] = useState(0);

    //Variables
    const token = sessionStorage.getItem("token");

    //Redux
    const dispatcher = useDispatch();
    const refresh = useSelector((state : RootState) => state.refresh.refreshChannel);
    const chanIdx = useSelector((state: RootState) => state.channelIdx.idx);

    //Render
    const ifNull = (
        <Segment style={{marginTop: "30vh"}} basic>
            <Header>아무것도...없네요? 😱</Header>
            <p>첫 게시자가 되어보세요</p>
        </Segment>
    )

    //Methods
    const getPostings = async () => {
        setPostingList([]);
        await axios.get(`/posting/get/${props.channel_idx}/${page}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            setPageData(res.data);
            setPostingList(res.data.content);
            // console.log(`Rendering Posting list...${JSON.stringify(postingList)}`);
        });
    }

    //Renderings
    const pageNavigation = (
        <Container style={{margin : "10px"}} textAlign={"center"} fluid>
            <Button size={"mini"} onClick={()=>setPage(0)} {...pageData.first ? {disabled : true} : null}>{'<<'}</Button>
            <Button size={"mini"} onClick={()=>setPage(page-1)} {...pageData.first ? {disabled : true} : null}>{'<'}</Button>
            <span style={{color : "white"}}> {pageData.number+1} / {pageData.totalPages} </span>
            <Button size={"mini"} onClick={()=>setPage(page+1)}  {...pageData.last ? {disabled : true} : null}>{'>'}</Button>
            <Button size={"mini"} onClick={()=>setPage(pageData.totalPages-1)} {...pageData.last ? {disabled : true} : null}>{'>>'}</Button>
        </Container>
    )


    //Use Effect
    useEffect(() => {
        getPostings();
    }, [chanIdx, refresh, page]);

    return (
        <Container
            as={Card.Group}
            style={{
                width: "100%",
                // height: "100vh",
                // overflow: "scroll",
            }}
            textAlign={"center"}
            // itemsPerRow={6}
            centered
        >
            {pageNavigation}
            {postingList ?
                postingList.map((posting : PostingTypes, index) =>{
                    return (
                        <Posting posting={posting} key={index}/>
                    )
                })
                : ifNull
            }
            {pageNavigation}
        </Container>
    )
}

export default ChannelPostings;