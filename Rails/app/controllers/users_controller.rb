class UsersController < ApplicationController

	def index
		users = User.all
		if users
			render json: users, status: 200
		else
			render json: nil, status: 401
		end
	end

	def show
		user = User.find_by(id: params[:id])
		if user
			render json: user, status: 200
		else
			render json: nil, status: 400
		end
	end

	private
		def authorized_user?
			token = params[:access_token]
			token = User.encrypt(token)
			if token != nil
				user = User.find_by(access_token: token)
				return (user != nil)
			else
				return false
			end
		end
end
