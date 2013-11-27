class SigninController < ApplicationController
	def create
		user = User.find_by(username: params[:username].downcase)
		if user && user.authenticate(params[:password])
			access_token = User.new_access_token
			user.update_attribute(:access_token, User.encrypt(access_token))
			render json: access_token, status: 200
		else
			render json: nil, status: 401
		end
	end

	private
		def signin_params
			return params.require(:user).permit(:username, :password)
		end
end
