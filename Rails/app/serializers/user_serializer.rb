class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :isAdmin
  has_one :teacher
end
