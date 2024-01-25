# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)



20.times do
  Project.create(
    title: Faker::App.name,
    description: Faker::Lorem.sentence(word_count: 20),
    industry: Faker::Company.industry,
    required_skills: Faker::Job.key_skill,
    resource_links: Faker::Internet.url,
    state: ['active', 'pending', 'completed'].sample,  # Assuming these are possible states
    image_url: Faker::Avatar.image,
    date: Faker::Date.between(from: '2021-01-01', to: '2021-12-31'),
    team_members: [Faker::Name.name, Faker::Name.name].join(', ')
  )
end
