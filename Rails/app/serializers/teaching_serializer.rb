class TeachingSerializer < ActiveModel::Serializer
  attributes :id
  has_one :teacher, embed: :objects
  has_one :lesson, embed: :objects
  has_one :group, embed: :objects
  has_one :reservation, embed: :objects

  has_many :reservation_requests, embed: :ids
end
