import { useSearchParams } from 'react-router-dom';
import catalog from '../product-catalog.json';
import ProductCard from '../components/Global/ProductCard';
import { useEffect, useState } from 'react';

function Collections() {
    const [searchParams] = useSearchParams(); // Getting URL search parameters
    const [products, setProducts] = useState([]); // State to store products
    const [queryExist, setQueryExist] = useState(false); // State to track if query exists
    const [collectionHeader, setCollectionHeader] = useState();

    //Query Oprions: Genre, Author, Type
    // E.g Fantasy, Jk Rowling, Fiction
    const genreQuery = searchParams.get('genre')
    const authorQuery = searchParams.get('author')
    const typeQuery = searchParams.get('type')


    useEffect(() => {
        //Filter catalog based on query
        filterQuery()
    }, [searchParams])
    

    function filterQuery(){
        let products = [];
        if(genreQuery){
            products = catalog.books.filter((item) => { return item.genre === genreQuery.toLowerCase()})
            setCollectionHeader(genreQuery.charAt(0).toUpperCase() + genreQuery.slice(1))
        } else if(authorQuery){
            products = catalog.books.filter((item) => { return  item.author.includes(authorQuery)})
            setCollectionHeader(authorQuery.charAt(0).toUpperCase() + authorQuery.slice(1))
        } else if(typeQuery) {
            products = catalog.books.filter((item) => { return item.type === typeQuery.toLowerCase()})
            setCollectionHeader(typeQuery.charAt(0).toUpperCase() + typeQuery.slice(1))
        } else { 
            products = catalog.books
            setCollectionHeader('Collections')
        }
        setProducts(products)
    }

    return ( 
        <div>
            <h1 className='text-center text-xl my-4 cursor-default'>{collectionHeader}</h1>

            <div className='grid lg:grid-cols-4 md:grid-cols-2'>
                {products.map((item, index) => (
                    <ProductCard key={index} product={item}/> 
                ))}
            </div>
        </div>
     );
    }

export default Collections;
