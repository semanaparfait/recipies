import { baseApi } from './baseApi';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

interface CreateRecipePayload {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  mealType: string[];
  image: string;
}

interface UpdateRecipePayload extends Partial<CreateRecipePayload> {
  id: number;
}

export const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get recipes with pagination, search, and sorting
    getRecipes: builder.query<
      RecipeResponse,
      {
        skip?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        order?: 'asc' | 'desc';
      }
    >({
      query: ({ skip = 0, limit = 10, search = '', sortBy, order }) => {
        let url = `/recipes?skip=${skip}&limit=${limit}`;
        if (search) url += `&q=${search}`;
        if (sortBy && order) {
          url += `&sortBy=${sortBy}&order=${order}`;
        }
        return url;
      },
      providesTags: ['Recipes'],
    }),

    // Get single recipe
    getRecipe: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Recipes', id }],
    }),

    // Create recipe
    createRecipe: builder.mutation<Recipe, CreateRecipePayload>({
      query: (body) => ({
        url: '/recipes/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Recipes'],
    }),

    // Update recipe
    updateRecipe: builder.mutation<Recipe, UpdateRecipePayload>({
      query: ({ id, ...body }) => ({
        url: `/recipes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Recipes', id },
        'Recipes',
      ],
    }),

    // Delete recipe
    deleteRecipe: builder.mutation<void, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipes'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;

export type { Recipe, RecipeResponse, CreateRecipePayload, UpdateRecipePayload };
