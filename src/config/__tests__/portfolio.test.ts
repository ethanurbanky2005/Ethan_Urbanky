import { portfolio } from '../portfolio'

describe('Portfolio Configuration', () => {
  test('has valid identity data', () => {
    expect(portfolio.identity).toBeDefined()
    expect(portfolio.identity.name).toBe('Ethan Urbanky')
    expect(portfolio.identity.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    expect(portfolio.identity.phone).toBeTruthy()
    expect(portfolio.identity.location).toBeTruthy()
  })

  test('has valid social links', () => {
    expect(portfolio.identity.links.linkedin).toContain('linkedin.com')
    expect(portfolio.identity.links.github).toContain('github.com')
  })

  test('has complete education data', () => {
    expect(Array.isArray(portfolio.resume.education)).toBe(true)
    expect(portfolio.resume.education.length).toBeGreaterThan(0)
    
    portfolio.resume.education.forEach(edu => {
      expect(edu.institution).toBeTruthy()
      expect(edu.program).toBeTruthy()
      expect(edu.gradYear).toBeTruthy()
    })
  })

  test('has valid experience data', () => {
    expect(Array.isArray(portfolio.resume.experience)).toBe(true)
    expect(portfolio.resume.experience.length).toBeGreaterThan(0)
    
    portfolio.resume.experience.forEach(exp => {
      expect(exp.company).toBeTruthy()
      expect(exp.role).toBeTruthy()
      expect(exp.period).toBeTruthy()
      expect(Array.isArray(exp.bullets)).toBe(true)
    })
  })

  test('has comprehensive skills data', () => {
    expect(portfolio.resume.skills).toBeDefined()
    expect(Array.isArray(portfolio.resume.skills.programming)).toBe(true)
    expect(Array.isArray(portfolio.resume.skills.frameworks)).toBe(true)
    expect(Array.isArray(portfolio.resume.skills.data)).toBe(true)
    
    // Check for key skills
    expect(portfolio.resume.skills.programming).toContain('Python')
    expect(portfolio.resume.skills.programming).toContain('JavaScript')
    expect(portfolio.resume.skills.data).toContain('Pandas')
  })

  test('has valid projects data', () => {
    expect(Array.isArray(portfolio.projects)).toBe(true)
    expect(portfolio.projects.length).toBeGreaterThan(0)
    
    portfolio.projects.forEach(project => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.icon).toBeTruthy()
      expect(Array.isArray(project.tech)).toBe(true)
      expect(project.tech.length).toBeGreaterThan(0)
      expect(typeof project.mass).toBe('number')
      expect(project.mass).toBeGreaterThan(0)
    })
  })

  test('projects have unique IDs', () => {
    const ids = portfolio.projects.map(p => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  test('has creative configuration', () => {
    expect(portfolio.creative).toBeDefined()
    expect(portfolio.creative.coreTheme).toBeTruthy()
    expect(portfolio.creative.defaultMode).toBe('dark')
  })
})
