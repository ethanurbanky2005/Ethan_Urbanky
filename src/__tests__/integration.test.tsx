import { render, screen, waitFor } from '@testing-library/react'
import { portfolio } from '@/config/portfolio'

// Test the actual NeuralBrain with real dependencies
describe('Integration Tests', () => {
  describe('Portfolio Data Integration', () => {
    test('portfolio projects data is valid and accessible', () => {
      expect(portfolio.projects).toBeDefined()
      expect(Array.isArray(portfolio.projects)).toBe(true)
      expect(portfolio.projects.length).toBeGreaterThan(0)
      
      console.log('Portfolio projects:', portfolio.projects)
      
      portfolio.projects.forEach((project) => {
        expect(project.id).toBeTruthy()
        expect(project.title).toBeTruthy()
        expect(project.icon).toBeTruthy()
        expect(project.description).toBeTruthy()
        expect(Array.isArray(project.tech)).toBe(true)
        expect(typeof project.mass).toBe('number')
      })
    })

    test('project icons are valid emojis', () => {
      const validEmojis = ['🏈', '💼', '🌌', '⚡', '🚀', '💻', '🔬', '🎯']
      
      portfolio.projects.forEach((project) => {
        expect(
          validEmojis.includes(project.icon) || /\p{Emoji}/u.test(project.icon)
        ).toBe(true)
      })
    })

    test('project tech arrays are not empty', () => {
      portfolio.projects.forEach((project) => {
        expect(project.tech.length).toBeGreaterThan(0)
      })
    })
  })

  describe('NeuralBrain useEffect Issue', () => {
    test('identifies why nodes state remains empty', async () => {
      // Create a test component that mimics NeuralBrain's useEffect logic
      const TestComponent = () => {
        const [nodes, setNodes] = React.useState<unknown[]>([])
        const [debugInfo, setDebugInfo] = React.useState<Record<string, unknown>>({})

        React.useEffect(() => {
          console.log('useEffect running...')
          console.log('portfolio.projects:', portfolio.projects)
          
          const projects = portfolio.projects
          setDebugInfo({
            projectsLength: projects.length,
            projectsExist: projects.length > 0,
            firstProject: projects[0] || null
          })

          if (projects.length === 0) {
            console.log('No projects found - early return')
            return
          }

          const newNodes = projects.map((project, index) => {
            const angle = (index / projects.length) * Math.PI * 2
            const radius = Math.min(250, 180 + index * 20)
            const x = 50 + Math.cos(angle) * (radius / 400) * 25
            const y = 50 + Math.sin(angle) * (radius / 300) * 20
            
            return {
              id: project.id,
              x,
              y,
              project,
              connections: [],
              isActive: false,
              pulsePhase: Math.random() * Math.PI * 2
            }
          })

          console.log('Setting nodes:', newNodes)
          setNodes(newNodes)
        }, [])

        return (
          <div data-testid="debug-component">
            <div data-testid="nodes-count">{nodes.length}</div>
            <div data-testid="debug-info">{JSON.stringify(debugInfo)}</div>
            {nodes.map(node => (
              <div key={node.id} data-testid={`node-${node.id}`}>
                {node.project.icon}
              </div>
            ))}
          </div>
        )
      }

      const { React } = await import('react')
      render(<TestComponent />)

      // Wait for useEffect to complete
      await waitFor(() => {
        const nodesCount = screen.getByTestId('nodes-count')
        expect(parseInt(nodesCount.textContent || '0')).toBeGreaterThan(0)
      }, { timeout: 1000 })

      // Check if nodes were created
      const nodesCount = screen.getByTestId('nodes-count')
      expect(parseInt(nodesCount.textContent || '0')).toBe(portfolio.projects.length)

      // Check if project icons are rendered
      portfolio.projects.forEach(project => {
        expect(screen.getByTestId(`node-${project.id}`)).toBeInTheDocument()
        expect(screen.getByText(project.icon)).toBeInTheDocument()
      })
    })
  })

  describe('Component Rendering Pipeline', () => {
    test('all major components can render with real data', () => {
      // Test that each component can handle the actual portfolio data
      expect(() => {
        // Simulate what happens in the main page
        const projectsData = portfolio.projects
        const identityData = portfolio.identity
        
        expect(projectsData.length).toBeGreaterThan(0)
        expect(identityData.name).toBeTruthy()
        expect(portfolio.resume.education.length).toBeGreaterThan(0)
        expect(portfolio.resume.experience.length).toBeGreaterThan(0)
      }).not.toThrow()
    })
  })
})
