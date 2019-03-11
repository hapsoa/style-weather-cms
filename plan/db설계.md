```javascript

users: {
    user1: {
        uid: string,
        createdAt: number,
        updatedAt: number,
    },
    user2...
}

clothes: {
    cloth1: {
        id: string (cloth1)
        gender: string ('남성', '여성', '양성공용'),
        majorCategory: string ('상의', '아우터, '원피스',...),
        minorCategory: string ('반팔', '맨투맨', ...),
        tags: string[] (['태그1', '태그2', ...]),
        image: string ('storageLinkImageUrl'),
        weatherInformation: string ('눈', '비', '미세먼지', ...),
        temperature: string ('4도 이하', '5~9도', ...),
        thickness: string ('두꺼움', '적당함', '얇음'),
        season: string ('봄', '여름', '가을', '겨울', '4계절가능'),
        color: string ('무채', '유채')
        timeStamp
    },
    cloth2...
}

clothesGroups: {
    clothesGroup1(id): {
        id: string (clothesGroup1),
        clothIds: Cloth[] (['clothId1', 'clothId2', ...]),
        image: string ('storageLinkImageUrl'),
        timeStamp: number,
        tags: string[],
    }
}


```
