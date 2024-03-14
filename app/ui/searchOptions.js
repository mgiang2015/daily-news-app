"use client"

import { useState } from "react"

export default function SearchOptions() {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [sortBy, setSortBy] = useState("");

    function handleCategoryPick(event) {        
        const catCode = event.target.value;
        if (categories.includes(catCode)) {
            setCategories(categories.splice(categories.indexOf(catCode), 1));
        } else {
            setCategories([...categories, catCode]);
        }
    }

    function handleSourcePick(event) {        
        const source = event.target.value;
        if (sources.includes(source)) {
            setSources(sources.splice(sources.indexOf(source), 1));
        } else {
            setSources([...sources, source]);
        }
    }

    function handleSortPick(event) {
        setSortBy(event.target.value);
    }

    return (
        <>
            <div style={{ marginBottom: "0.5em" }}>
                <div>Categories</div>
                <input type="checkbox" value="04000000" onChange={handleCategoryPick}/> Economy, Business and Finance
                <input type="checkbox" value="05000000" onChange={handleCategoryPick}  style={{ marginLeft: "2em" }}/> Education
                <input type="checkbox" value="09000000" onChange={handleCategoryPick}  style={{ marginLeft: "2em" }}/> Labour
                <input type="checkbox" value="11000000" onChange={handleCategoryPick}  style={{ marginLeft: "2em" }}/> Politics
                <input type="checkbox" value="13000000" onChange={handleCategoryPick}  style={{ marginLeft: "2em" }}/> Science and Technology
                <input type="checkbox" value="16000000" onChange={handleCategoryPick}  style={{ marginLeft: "2em" }}/> Conflict, War and Peace
            </div>
            <div style={{ marginBottom: "0.5em" }}>
                <div>Sources</div>
                <input type="checkbox" value="sg" onChange={handleSourcePick}/> Singapore (Straits Times, Channel News Asia)
            </div>
            <div style={{ marginBottom: "0.5em" }}>
                <div>Sort By</div>
                <select onChange={handleSortPick} style={{ padding: "0.5em" }}>
                    <option value="">PublishedOn</option>
                    <option value="Title">Title</option>
                    <option value="Source">Source</option>
                    <option value="SourceNationality">SourceNationality</option>
                    <option value="Description">Description</option>
                    <option value="Categories">Categories</option>
                </select>
            </div>
            <div style={{ marginBottom: "0.5em", width: "fit-content", padding: "0.5em", backgroundColor: "#0092fb", color: "white", borderRadius: 10 }}>
                <a href={"/news?" + new URLSearchParams({
                    categories: categories,
                    sources: sources,
                    sortBy: sortBy
                })}>Search</a>
            </div>
        </>
    )
}
