import { Col, Layout, Row } from "antd";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { axiosOptions } from "../../services/api";
import { API_ENDPOINTS } from "../../services/api/apiEndpoints";
import {
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledImg,
  StyledSearch,
} from "./styled";
import Bucket from "../../assets/bucket.jpeg";
import Loader from "../../components/Loader";
import RecipeBox from "../../components/RecipeBox";
import { debounce } from "lodash";
import RecipeDetail from "../../components/Detail";
import axios from "axios";
import { getEnvValue } from "../../utils";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [allRecipes, setRecipes] = useState([]);
  const [searchText, setSearch] = useState("");
  const API_BASE_URL = getEnvValue("API_BASE_URL");

  const getRecipeList = async (searchText) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}${API_ENDPOINTS.SEARCH_RECIPES}?query=${
          searchText ?? "italian"
        }`,
        { ...axiosOptions }
      );
      if (res?.data?.length) {
        setRecipes(res.data);
      } else {
        setRecipes([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch recipes", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipeList();
  }, []);

  // Wrapped with callback so that debounce can work
  const refreshList = useCallback(
    debounce((searchText) => {
      getRecipeList(searchText);
    }, 1000),
    []
  );

  useEffect(() => {
    if (searchText) {
      refreshList(searchText);
    } else {
      refreshList("italian");
    }
  }, [searchText, refreshList]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Layout>
      {/* Loader while recipes are loading */}
      {loading && <Loader />}

      {/* Recipe details modal */}
      <RecipeDetail />

      {/* Header */}
      <StyledHeader>
        <StyledImg alt="logo" src={Bucket} />
        <StyledSearch
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for recipe"
        />
      </StyledHeader>

      {/* Content container */}
      <StyledContent>
        <Row gutter={16} justify={allRecipes?.length ? "start" : "center"}>
          {allRecipes?.length ? (
            allRecipes.map((x) => <RecipeBox key={x.title} {...x} />)
          ) : (
            <Col span={24}>
              <p>No recipes found</p>
            </Col>
          )}
        </Row>
      </StyledContent>

      {/* Footer */}
      <StyledFooter>Recipe bucket v1 &#169;2022</StyledFooter>
    </Layout>
  );
};

export default Dashboard;
