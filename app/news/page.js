'use client'

import { useState, useEffect } from "react";

export default function News() {
    const [data, setData] = useState({news: []});

    useEffect(() => {
        console.log("fetching news now!")
        fetch('/api/news')
        .then(res => res.json())
        .then(resData => {
            console.log(resData.data);
            setData(resData.data);
        })
    }, [])

    return (
        <div>
            {
                data.news.map(article => {
                    return (
                        <div key={article.Title}>
                            <p>{article.Title}</p>
                            <p>{article.Source}</p>
                            <p>{article.Url}</p>
                            <p>{article.PublishedOn}</p>
                            <p>{article.Description}</p>
                            <p>{article.Summary}</p>
                            <p>{article.Categories.label}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}