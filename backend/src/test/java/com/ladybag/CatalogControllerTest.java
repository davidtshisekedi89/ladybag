package com.ladybag;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CatalogControllerTest {
    @Autowired MockMvc mvc;

    @Test
    void listsSeededProducts() throws Exception {
        mvc.perform(get("/api/items")).andExpect(status().isOk())
            .andExpect(jsonPath("$.data.length()").value(4))
            .andExpect(jsonPath("$.data[0].attributes.image.data.attributes.formats.medium.url").exists());
    }

    @Test
    void unknownProductReturns404() throws Exception {
        mvc.perform(get("/api/items/999999")).andExpect(status().isNotFound());
    }
}
