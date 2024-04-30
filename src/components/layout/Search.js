import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Input, InputRightElement, Button, Icon } from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedKeyword = localStorage.getItem('keyword');
        if (savedKeyword) {
            setKeyword(savedKeyword);
        }
    }, []);

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/products');
        }
        localStorage.setItem('keyword', keyword);
    };

    return (
        <form onSubmit={searchHandler}>
            <InputGroup size="md">
                <Input
                    type="text"
                    id="search_field"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    autoFocus
                />
                <InputRightElement width="3rem">
                    <Button h="1.75rem" size="sm" type="submit">
                        <Icon as={FaSearch} color="gray.500" />
                    </Button>
                </InputRightElement>
            </InputGroup>
        </form>
    );
};

export default Search;
