Urm::Application.routes.draw do

  match '/*path' => 'application#cors_preflight_check', :via => :options

  resources :reservations

  resources :rooms

  resources :reservation_requests

  resources :teachings

  resources :lessons

  resources :subjects

  resources :mods, :path => "modules"

  resources :lesson_types

  resources :groups

  resources :time_slots

  resources :characteristics

  resources :buildings

  resources :teachers

  resources :users

  post '/signin', to: 'signin#create'

  get '/teachers/:id/reservations', to: 'teachers#reservations'
  get '/teachers/:id/reservation_requests', to: 'teachers#reservation_requests'
  get '/teachers/:id/available_reservation_requests', to: 'teachers#available_reservation_requests'

  get '/groups/:id/reservations', to: 'groups#reservations'
  get '/groups/:id/available_teachings', to: 'groups#available_teachings'

  get '/reservation_requests/:id/available_rooms', to: 'reservation_requests#available_rooms'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
