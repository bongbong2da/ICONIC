import {PostingTypes} from "./Posting";

type PostingSourceTypes = {
    postingIdx : number
    postingAttach : string
    postingChanIdx : number
    postingContent : string
    postingEmoji : string
    postingIsAttached : string
    postingReg : string
    postingTitle : string
    postingWriter : string
}

export const parsingPost = (dbData : any | null) : PostingTypes[] => {
    let parsedData: PostingTypes[] = [];
    if(dbData === null) return [];
    dbData.map((data : PostingSourceTypes) => {
        let parsingPost : PostingTypes = {
            idx : data.postingIdx,
            chan_idx : data.postingChanIdx,
            writer : data.postingWriter,
            title : data.postingTitle,
            emoji : data.postingEmoji,
            content : data.postingContent,
            count : 0,
            isAttached : data.postingIsAttached,
            attach : data.postingAttach,
            reg : new Date(data.postingReg)
        };
        parsedData.push(parsingPost);
    });
    // console.log(`Parsing Completed : ${JSON.stringify(parsedData)}`)
    return parsedData;
}