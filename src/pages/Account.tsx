import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLoginMutation, useGetMeQuery } from '@/services/authApi'
import { useGetRecipesQuery, useCreateRecipeMutation, useUpdateRecipeMutation, useDeleteRecipeMutation } from '@/services/recipeApi'
import LoginForm from '@/components/LoginForm'
import RecipeForm from '@/components/RecipeForm'
import RecipeDashboard from '@/components/RecipeDashboard'
import UserProfile from '@/components/UserProfile'
import toast from 'react-hot-toast'

function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRecipeForm, setShowRecipeForm] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<any>(null)
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const [login] = useLoginMutation()
  const { data: user, refetch: refetchUser } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  })

  const { data: recipesData, refetch: refetchRecipes } = useGetRecipesQuery(
    { skip: 0, limit: 100 },
    { skip: !isLoggedIn }
  )

  const [createRecipe] = useCreateRecipeMutation()
  const [updateRecipe] = useUpdateRecipeMutation()
  const [deleteRecipe] = useDeleteRecipeMutation()

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login({ username, password }).unwrap()
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      setIsLoggedIn(true)
      refetchUser()
      toast.success('Logged in successfully!')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Login failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    setEditingRecipe(null)
    setShowRecipeForm(false)
    toast.success('Logged out successfully!')
    navigate('/')
  }

  const handleCreateRecipe = async (recipeData: any) => {
    try {
      await createRecipe(recipeData).unwrap()
      toast.success('Recipe created successfully!')
      refetchRecipes()
      setShowRecipeForm(false)
    } catch (error: any) {
      toast.error('Failed to create recipe')
    }
  }

  const handleUpdateRecipe = async (recipeData: any) => {
    try {
      await updateRecipe({
        id: editingRecipe.id,
        ...recipeData,
      }).unwrap()
      toast.success('Recipe updated successfully!')
      refetchRecipes()
      setEditingRecipe(null)
      setShowRecipeForm(false)
    } catch (error: any) {
      toast.error('Failed to update recipe')
    }
  }

  const handleDeleteRecipe = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return
    try {
      await deleteRecipe(id).unwrap()
      toast.success('Recipe deleted successfully!')
      refetchRecipes()
    } catch (error: any) {
      toast.error('Failed to delete recipe')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <div className="space-y-8">
            {/* User Profile Section */}
            <UserProfile user={user} onLogout={handleLogout} />

            {/* Dashboard Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">My Recipes</h2>
                <button
                  onClick={() => {
                    setEditingRecipe(null)
                    setShowRecipeForm(true)
                  }}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  + Add Recipe
                </button>
              </div>

              {/* Recipe Form */}
              {showRecipeForm && (
                <RecipeForm
                  recipe={editingRecipe}
                  onSubmit={editingRecipe ? handleUpdateRecipe : handleCreateRecipe}
                  onCancel={() => {
                    setShowRecipeForm(false)
                    setEditingRecipe(null)
                  }}
                />
              )}

              {/* Recipes Dashboard */}
              {recipesData && (
                <RecipeDashboard
                  recipes={recipesData.recipes || []}
                  onEdit={(recipe) => {
                    setEditingRecipe(recipe)
                    setShowRecipeForm(true)
                  }}
                  onDelete={handleDeleteRecipe}
                />
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Account