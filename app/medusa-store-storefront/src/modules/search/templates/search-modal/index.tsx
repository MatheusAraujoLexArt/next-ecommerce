"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useRouter } from "next/navigation"
import { MagnifyingGlassMini } from "@medusajs/icons"

import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box"
import { useEffect, useRef, useState } from "react"

export default function SearchModal() {
  const router = useRouter()
  const searchRef = useRef(null)
  const [searchText, setSearchText] = useState('');

  // close modal on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === searchRef.current) {
      router.back()
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick)
    // cleanup
    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // on escape key press, close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back()
      }
    }
    window.addEventListener("keydown", handleEsc)

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async () => {
    if(!searchText) {
      return
    }
    
    try {
      if(searchText) {
        router.push(`/store?searchQuery=${encodeURIComponent(searchText)}`);
      }
    } catch (error) {
      console.log('search product error');
    }
  };

  const handleClear = () => {
    setSearchText('');
  };

  return (
    <div className="relative z-[75]">
  <div className="fixed inset-0 bg-opacity-75 backdrop-blur-md opacity-100 h-screen w-screen" />
  <div className="fixed inset-0 flex justify-center items-center px-5 sm:p-0" ref={searchRef}>
    <div className="flex flex-col justify-center items-center w-full h-fit p-5 text-left align-middle transition-all max-h-[75vh] bg-transparent shadow-none">
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search products..."
          className="p-2"
        />
        <button onClick={handleSearch} className="bg-primaryColor hover:opacity-50 text-white font-bold py-2 px-4 rounded ml-2">
          Search
        </button>
        <button onClick={handleClear} className="bg-red-500 hover:opacity-50 text-white font-bold py-2 px-4 rounded ml-2">
          Clean
        </button>
      </div>
    </div>
  </div>
</div>
  )
}
